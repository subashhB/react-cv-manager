import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const ApplicantsPage = () => {
    const [applicantsList, setApplicantsList] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/Applicants")
            .then((response) => setApplicantsList(response.data));
    }, []);
    console.log(applicantsList);
    return (
        <div>
            ApplicantsPage
            <Outlet
                applicantsList={applicantsList}
                setApplicantsList={setApplicantsList}
            />
        </div>
    );
};

export default ApplicantsPage;
