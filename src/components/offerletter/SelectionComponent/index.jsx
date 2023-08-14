import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SelectionComponent = ({ applications }) => {
    const [application, setApplication] = useState("");
    const [post, setPost] = useState(null);
    const [jobPostings, setJobPostings] = useState([]);
    const [departments, setDepartments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/JobPostings?_expand=JobPositions")
            .then((response) => setJobPostings(response.data));
        axios
            .get("http://localhost:3001/JobDomains")
            .then((response) => setDepartments(response.data));
    }, []);

    const formatDate = (date) => {
        const day = new Intl.DateTimeFormat("en", { day: "numeric" }).format(
            date
        );
        const month = new Intl.DateTimeFormat("en", { month: "long" }).format(
            date
        );
        const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
            date
        );

        const suffix = (day) => {
            if (day >= 11 && day <= 13) return "th";
            switch (day % 10) {
                case 1:
                    return "st";
                case 2:
                    return "nd";
                case 3:
                    return "rd";
                default:
                    return "th";
            }
        };

        return `${day}${suffix(day)} ${month}, ${year}`;
    };
    const handleSelect = (e) => {
        setApplication(e.target.value);
        const relativePost = jobPostings.find(
            (jobPosting) => jobPosting.id === e.target.value.JobPostingsId
        );
        setPost(relativePost);
    };
    const handlePreview = () => {
        const letterDate = formatDate(new Date());
        const applicantName = `${application.Applicants.FirstName} ${
            application.Applicants.MiddleName
                ? `${application.Applicants.MiddleName} `
                : ""
        }${application.Applicants.LastName}`;
        const jobTitle = post.JobPositions.Name;
        const department = departments.find(
            (dpt) => dpt.id === post.JobPositions.JobDomainId
        ).Name;
        const negotiatedSalary = application.NegotiatedSalary;
        const email = application.Applicants.PrimaryEmail;
        const letterFields = {
            date: letterDate,
            applicantName,
            jobTitle,
            department,
            negotiatedSalary,
            email,
        };

        console.log(letterFields);
        navigate("/offerletter/preview", { state: { letterFields } });
    };
    return (
        <Box className="w-full flex justify-center">
            <Box className="w-1/2 my-4">
                <Box>
                    <FormControl fullWidth>
                        <InputLabel id="select-application">
                            Candidates
                        </InputLabel>
                        <Select
                            labelId="select-application"
                            id="select-candidate"
                            value={application}
                            onChange={(e) => handleSelect(e)}
                        >
                            <MenuItem value={""} disabled>
                                Select a Candidate
                            </MenuItem>
                            {applications?.map((app) => (
                                <MenuItem value={app} key={app.id}>
                                    {`${app.Applicants.FirstName} ${
                                        app.Applicants.MiddleName
                                            ? `${app.Applicants.MiddleName} `
                                            : ""
                                    }${app.Applicants.LastName}`}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className="my-4">
                    <Typography sx={{ color: "gray" }}>
                        <span className="font-bold">Job Position</span>:{" "}
                        {post?.JobPositions.Name}
                    </Typography>
                </Box>
                <Box className="w-full flex justify-end">
                    <Button
                        onClick={() => {
                            handlePreview();
                        }}
                        disabled={application === ""}
                    >
                        Preview
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default SelectionComponent;
