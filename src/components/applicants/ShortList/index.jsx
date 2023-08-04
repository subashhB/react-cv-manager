import React, { useEffect } from "react";
import { useApplicantsContext } from "../../../pages/Applicants/hook/useApplicantsContext";
import axios from "axios";
import * as ActionTypes from "../../../pages/Applicants/context/ActionTypes";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const ShortList = () => {
    const { applicants, dispatch } = useApplicantsContext();
    useEffect(() => {
        axios.get("http://localhost:3001/Applicants").then((response) => {
            dispatch({
                type: ActionTypes.SET_APPLICANTS,
                payload: response.data,
            });
        });
    }, [dispatch]);
    const shortlist = applicants.filter((applicant) => applicant.IsShortlisted);
    console.log(applicants);
    const tableHead = [
        { id: 1, title: "S. No" },
        { id: 2, title: "Name" },
        { id: 3, title: "Email" },
        { id: 4, title: "Phone No." },
        { id: 5, title: "Referred By" },
    ];

    const handleAddCandidate = (applicant) => {
        console.log(applicant);
        const candidate = {
            ApplicantsId: applicant.id,
            CandidateStatus: "",
            Remarks: "",
        };
        axios.post("http://localhost:3001/Candidates", candidate);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {tableHead.map((title) => (
                            <th key={title.id}>{title.title}</th>
                        ))}
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {shortlist?.map((applicant, i) => (
                        <tr key={applicant.id}>
                            <td>{i + 1}</td>
                            <td>
                                <Link to={`/applicants/${applicant.id}`}>
                                    {`${applicant.FirstName} ${
                                        applicant.MiddleName
                                            ? applicant.MiddleName
                                            : "\u00A0"
                                    } ${applicant.LastName}`}
                                </Link>
                            </td>
                            <td>{applicant.PrimaryEmail}</td>
                            <td>{applicant.PrimaryPhoneNumber}</td>
                            <td>{applicant.ReferredBy}</td>
                            <td
                                onClick={() => {
                                    handleAddCandidate(applicant);
                                }}
                            >
                                <Button>Add Candidate</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShortList;
