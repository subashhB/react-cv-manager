import axios from "axios";
import React, { useEffect, useState } from "react";
import JobApplicationList from "../../../components/applicants/JobApplicationList";

const JobApplicationPage = () => {
    const [applicants, setApplicants] = useState([]);
    const [jobPositions, setJobPositions] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/Applicants").then((response) => {
            setApplicants(response.data);
        });
        axios
            .get("http://localhost:3001/JobPositions")
            .then((response) => setJobPositions(response.data));
    }, []);

    console.log("context", applicants);

    return (
        <div>
            <JobApplicationList
                applicants={applicants}
                jobPositions={jobPositions}
            />
        </div>
    );
};

export default JobApplicationPage;
