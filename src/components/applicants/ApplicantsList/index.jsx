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
    const applicantList = applicants.filter(
        (applicant) => !applicant.IsBlacklisted
    );
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
                    </tr>
                </thead>
                <tbody>
                    {applicantList?.map((applicant, i) => (
                        <tr key={applicant.id} className="tr">
                            <td className="td">{i + 1}</td>
                            <td className="td">
                                <Link to={`/applicants/${applicant.id}`}>
                                    {`${applicant.FirstName} ${
                                        applicant.MiddleName
                                            ? applicant.MiddleName
                                            : "\u00A0"
                                    } ${applicant.LastName} `}
                                    {applicant.IsShortlisted && (
                                        <span className="text-sm italic text-gray-500">
                                            (Shortlisted)
                                        </span>
                                    )}
                                </Link>
                            </td>
                            <td className="td">{applicant.PrimaryEmail}</td>
                            <td className="td">
                                {applicant.PrimaryPhoneNumber}
                            </td>
                            <td className="td">{applicant.ReferredBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsList;
