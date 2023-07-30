import React from "react";
import ApplicantsDetails from "../../../components/applicants/ApplicantDetails";
import { useParams } from "react-router-dom";

const ApplicantsDetailsPage = () => {
    const { id } = useParams();
    return (
        <div>
            <ApplicantsDetails id={id} />
        </div>
    );
};

export default ApplicantsDetailsPage;
