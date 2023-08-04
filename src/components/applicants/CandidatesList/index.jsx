import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CanididatesList = () => {
    const [canditades, setCandidates] = useState([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [applicantsId, setApplicantsId] = useState(0);
    const [status, setStatus] = useState("");
    const [remarks, setRemarks] = useState("");

    const statusArray = [
        { id: 1, statusTitle: "Interviewing" },
        { id: 2, statusTitle: "Selected for Hiring" },
        { id: 3, statusTitle: "Result Pending" },
        { id: 4, statusTitle: "Selected For Interview" },
        { id: 5, statusTitle: "Selected For Assessment Test" },
        { id: 6, statusTitle: "Rejected" },
    ];

    useEffect(() => {
        axios
            .get("http://localhost:3001/Candidates?_expand=Applicants")
            .then((response) => {
                setCandidates(response.data);
            });
    }, []);
    console.log(canditades);
    const tableHead = [
        { id: 1, title: "S.No." },
        { id: 2, title: "Candidate Name" },
        { id: 3, title: "Status" },
        { id: 4, title: "Remarks" },
    ];
    const handleOpen = (id, applicantId) => {
        setId(id);
        console.log(applicantId);
        setApplicantsId(applicantId);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setId(0);
        setApplicantsId(0);
        setRemarks("");
        setStatus("");
    };
    const handleRemove = (id) => {
        axios
            .delete(`http://localhost:3001/Candidates/${id}`)
            .then(() => {
                setCandidates((prev) => prev.filter((data) => data.id !== id));
                toast.success("Candidate has been successfully removed", {
                    position: "top-right",
                    theme: "light",
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error(error.message, {
                    position: "top-right",
                    theme: "light",
                });
            });
    };
    const handleUpdateCandidate = () => {
        let updatedCandidate = undefined;
        if (id > 0 && applicantsId > 0) {
            updatedCandidate = {
                id: id,
                ApplicantsId: applicantsId,
                CandidateStatus: status,
                Remarks: remarks,
            };
        }
        if (updatedCandidate) {
            axios
                .patch(
                    `http://localhost:3001/Candidates/${id}`,
                    updatedCandidate
                )
                .then((response) => {
                    setCandidates((prev) =>
                        prev.map((item) =>
                            item.id === response.data.id
                                ? {
                                      ...item,
                                      CandidateStatus:
                                          response.data.CandidateStatus,
                                      Remarks: response.data.Remarks,
                                  }
                                : item
                        )
                    );
                })
                .then(() => {
                    handleClose();
                    toast.success("Candidate Updated Successfully", {
                        position: "top-right",
                        theme: "light",
                    });
                });
        }
    };
    return (
        <>
            <table className="table">
                <thead className="thead">
                    <tr>
                        {tableHead.map((heading) => (
                            <th key={heading.id} className="th">
                                {heading.title}
                            </th>
                        ))}
                        <th className="th" />
                    </tr>
                </thead>
                <tbody>
                    {canditades?.map((candidate, i) => (
                        <tr key={candidate.id} className="tr">
                            <td className="td">{i + 1}</td>
                            <td className="td">{`${
                                candidate.Applicants.FirstName
                            } ${
                                candidate.Applicants.MiddleName &&
                                `${candidate.Applicants.MiddleName} `
                            }${candidate.Applicants.LastName}`}</td>
                            <td className="td">
                                {candidate.CandidateStatus || "N/A"}
                            </td>
                            <td className="td">{candidate.Remarks || "N/A"}</td>
                            <td className="td">
                                {" "}
                                <Button
                                    onClick={() =>
                                        handleOpen(
                                            candidate.id,
                                            candidate.ApplicantsId
                                        )
                                    }
                                >
                                    Update
                                </Button>
                                <Button
                                    sx={{ color: "red" }}
                                    onClick={() => handleRemove(candidate.id)}
                                >
                                    Remove
                                </Button>{" "}
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
                <Box className=" absolute text-centerter rounded-lg text-gray-800 top-[20%] left-[35%] w-[500px] h-[400px] shadow-lg p-16 bg-white">
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
                                value={status}
                                label="Status"
                                onChange={(e) => {
                                    setStatus(e.target.value);
                                }}
                            >
                                {statusArray.map((statusItem) => (
                                    <MenuItem value={statusItem.statusTitle}>
                                        {statusItem.statusTitle}
                                    </MenuItem>
                                ))}
                            </Select>
                            <TextareaAutosize
                                className="w-[350px] my-6 ms-2 rounded-lg border border-gray-500"
                                minRows={3}
                                value={remarks}
                                placeholder="Remarks for the Status"
                                onChange={(e) => {
                                    setRemarks(e.target.value);
                                }}
                            />
                        </FormControl>
                    </Box>

                    <Box className="flex justify-center mt-4">
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
                                handleUpdateCandidate();
                            }}
                        >
                            Update Candidate
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default CanididatesList;
