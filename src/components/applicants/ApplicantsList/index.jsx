import React, { useEffect } from "react";
import { useApplicantsContext } from "../../../pages/Applicants/hook/useApplicantsContext";
import axios from "axios";
import * as ActionTypes from "../../../pages/Applicants/context/ActionTypes";
import { Link } from "react-router-dom";

const ApplicantsList = () => {
    const { applicants, dispatch } = useApplicantsContext();
    useEffect(() => {
        axios.get("http://localhost:3001/Applicants").then((response) => {
            dispatch({
                type: ActionTypes.SET_APPLICANTS,
                payload: response.data,
            });
        });
    }, [dispatch]);
    console.log(applicants);
    const tableHead = [
        { id: 1, title: "S. No" },
        { id: 2, title: "Name" },
        { id: 3, title: "Email" },
        { id: 4, title: "Phone No." },
        { id: 5, title: "Referred By" },
    ];
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {tableHead.map((title) => (
                            <td key={title.id}>{title.title}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {applicants?.map((applicant, i) => (
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsList;
