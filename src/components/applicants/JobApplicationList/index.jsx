import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const JobApplicationList = ({ applicants, jobPositions }) => {
    const [jobApplications, setJobApplications] = useState([]);
    const [open, setOpen] = useState(false);
    const [jobApplicationToUpdate, setJobApplicationToUpdate] = useState(null);
    const [applicationStatus, setApplicationStatus] = useState("");
    const [negotiatedSalary, setNegotiatedSalary] = useState("");
    const [hiredOn, setHiredOn] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:3001/JobApplications?_expand=JobPostings")
            .then((response) => setJobApplications(response.data));
    }, []);
    console.log("jobApplications", jobApplications);
    const tableHead = [
        { id: 1, title: "S.No." },
        { id: 2, title: "Job Post" },
        { id: 3, title: "Applicant Name" },
        { id: 4, title: "Application Date" },
        { id: 5, title: "Application Status" },
        { id: 6, title: "Hired On" },
        { id: 7, title: "Negotiated Salary" },
        { id: 8, title: "" },
    ];
    const applicationStatusArray = [
        { id: 1, status: "Applied" },
        { id: 2, status: "Interview Scheduled" },
        { id: 3, status: "Rejected" },
        { id: 4, status: "Accepted" },
        { id: 5, status: "Parked" },
        { id: 6, status: "Offer Letter Sent" },
        { id: 7, status: "Hired" },
    ];
    const handleOpen = (jobApplication) => {
        setJobApplicationToUpdate(jobApplication);
        setOpen(true);
    };
    const handleClose = () => {
        setJobApplicationToUpdate(null);
        setOpen(false);
    };
    const handleApplicantName = (id) => {
        const applicant = applicants.find((person) => person.id === id);
        const applicantName = `${applicant.FirstName} ${
            applicant.MiddleName ? `${applicant.MiddleName} ` : ""
        }${applicant.LastName}`;
        return applicantName;
    };
    const handleBlackList = (id) => {
        const applicant = applicants.find((person) => person.id === id);
        return applicant.IsBlacklisted;
    };
    const handleUpdateApplication = () => {
        const updatedJobApplication = {
            id: jobApplicationToUpdate.id,
            JobPostingsId: jobApplicationToUpdate.JobPostingsId,
            ApplicantsId: jobApplicationToUpdate.ApplicantsId,
            ApplicationDate: jobApplicationToUpdate.ApplicationDate,
            JobApplicationStatus: applicationStatus,
            NegotiatedSalary: negotiatedSalary,
            HiredOn: hiredOn,
        };
        axios
            .patch(
                `http://localhost:3001/JobApplications/${updatedJobApplication.id}`,
                updatedJobApplication
            )
            .then(() =>
                setJobApplications((prev) =>
                    prev.map((item) =>
                        item.id !== updatedJobApplication.id
                            ? item
                            : {
                                  ...item,
                                  JobApplicationStatus: applicationStatus,
                                  NegotiatedSalary: negotiatedSalary,
                                  HiredOn: hiredOn,
                              }
                    )
                )
            )
            .then(() => {
                handleClose();
                toast.success("Application Successfully Updated", {
                    position: "top-right",
                    theme: "light",
                });
            });
    };
    console.log("status", applicationStatus);
    return (
        <>
            <table className="table">
                <thead className="thead">
                    <tr>
                        {tableHead.map((heading) => (
                            <th className="th" key={heading.id}>
                                {heading.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {applicants.length &&
                        jobApplications?.map((jobApplication, i) => (
                            <tr className="tr" key={jobApplication.id}>
                                <td className="td">{i + 1}</td>
                                <td className="td">
                                    {
                                        jobPositions?.find(
                                            (jobPosition) =>
                                                jobPosition.id ===
                                                jobApplication.JobPostings
                                                    .JobPositionsId
                                        )?.Name
                                    }
                                </td>
                                <td className="td">
                                    {handleApplicantName(
                                        jobApplication.ApplicantsId
                                    )}
                                </td>
                                <td className="td">
                                    {jobApplication.ApplicationDate}
                                </td>
                                <td className="td">
                                    {jobApplication.JobApplicationStatus ||
                                        "N/A"}
                                </td>
                                <td className="td">
                                    {jobApplication.HiredOn || "Not Hired"}
                                </td>
                                <td className="td">
                                    {jobApplication.NegotiatedSalary ||
                                        "Not Hired"}
                                </td>
                                <td className="td">
                                    <Tooltip
                                        title={
                                            <>
                                                {handleBlackList(
                                                    jobApplication.ApplicantsId
                                                )
                                                    ? "Blacklisted"
                                                    : "Update the Job Application"}
                                            </>
                                        }
                                        followCursor
                                    >
                                        <span>
                                            <Button
                                                disabled={handleBlackList(
                                                    jobApplication.ApplicantsId
                                                )}
                                                title="Button"
                                                onClick={() =>
                                                    handleOpen(jobApplication)
                                                }
                                            >
                                                Update
                                            </Button>
                                        </span>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    className=" absolute  text-centerter rounded-lg text-gray-800 top-[17%] left-[35%] w-[500px] h-[500px] shadow-lg p-16 bg-white"
                    position="relative"
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Update Candidate
                    </Typography>
                    <Box
                        sx={{ marginTop: 4, minWidth: 120 }}
                        id="modal-modal-description"
                    >
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Status
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="my-2"
                                value={applicationStatus}
                                label="Status"
                                onChange={(e) => {
                                    setApplicationStatus(e.target.value);
                                }}
                            >
                                {applicationStatusArray.map(
                                    (applicantionState) => (
                                        <MenuItem
                                            value={applicantionState.status}
                                            key={applicantionState.id}
                                        >
                                            {applicantionState.status}
                                        </MenuItem>
                                    )
                                )}
                            </Select>
                            {applicationStatus === "Hired" && (
                                <>
                                    <input
                                        id="date-picker"
                                        className="ms-1 mt-4 mb-6"
                                        type="date"
                                        value={hiredOn}
                                        onChange={(e) => {
                                            setHiredOn(e.target.value);
                                        }}
                                    />
                                    <TextField
                                        id="simple-textfield"
                                        label="Negotiated Salary"
                                        type="number"
                                        value={negotiatedSalary}
                                        onChange={(e) =>
                                            setNegotiatedSalary(
                                                e.target.valueAsNumber
                                            )
                                        }
                                    />
                                </>
                            )}
                        </FormControl>
                    </Box>

                    <Box className="w-5/6 flex absolute left-[7.25rem] bottom-10 mt-4">
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={() => handleClose()}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => {
                                handleUpdateApplication();
                            }}
                        >
                            Update Application
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default JobApplicationList;
