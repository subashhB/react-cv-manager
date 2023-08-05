import React, { useEffect } from "react";
import { useApplicantsContext } from "../../../pages/Applicants/hook/useApplicantsContext";
import axios from "axios";
import * as ActionTypes from "../../../pages/Applicants/context/ActionTypes";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

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
    const tableHead = [
        { id: 1, title: "S. No" },
        { id: 2, title: "Name" },
        { id: 3, title: "Email" },
        { id: 4, title: "Phone No." },
        { id: 5, title: "Referred By" },
    ];

    const handleAddCandidate = (applicant) => {
        const candidate = {
            ApplicantsId: applicant.id,
            CandidateStatus: "",
            Remarks: "",
        };
        const message = `${applicant.FirstName} ${
            applicant.MiddleName && `${applicant.MiddleName} `
        }${applicant.LastName} has been added as Candidate`;
        axios
            .post("http://localhost:3001/Candidates", candidate)
            .then(() => {
                toast.success(message, {
                    theme: "light",
                    position: "top-right",
                });
            })
            .catch((error) =>
                toast.error(error.message, {
                    position: "top-right",
                    theme: "light",
                })
            );
    };

    return (
        <div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        {tableHead.map((title) => (
                            <th key={title.id} className="th">
                                {title.title}
                            </th>
                        ))}
                        <th className="th" />
                    </tr>
                </thead>
                <tbody>
                    {shortlist?.map((applicant, i) => (
                        <tr key={applicant.id} className="tr">
                            <td className="td">{i + 1}</td>
                            <td className="td">
                                <Link to={`/applicants/${applicant.id}`}>
                                    {`${applicant.FirstName} ${
                                        applicant.MiddleName
                                            ? applicant.MiddleName
                                            : "\u00A0"
                                    } ${applicant.LastName}`}
                                </Link>
                            </td>
                            <td className="td">{applicant.PrimaryEmail}</td>
                            <td className="td">
                                {applicant.PrimaryPhoneNumber}
                            </td>
                            <td className="td">{applicant.ReferredBy}</td>
                            <td
                                className="td"
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
