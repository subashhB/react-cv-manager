import React, { useEffect, useState } from "react";
import ApplicantsDetails from "../../../components/applicants/ApplicantDetails";
import { useParams } from "react-router-dom";
import axios from "axios";

const ApplicantsDetailsPage = () => {
    const { id } = useParams();

    const [jobDomains, setJobDomains] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:3001/JobDomains").then((response) => {
            setJobDomains(response.data);
        });
    }, []);
    return (
        <div>
            <ApplicantsDetails id={id} jobDomains={jobDomains} />
        </div>
    );
};

export default ApplicantsDetailsPage;
