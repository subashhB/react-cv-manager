import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CanididatesList = () => {
    const [canditades, setCandidates] = useState([]);
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
                            <td className="td">{candidate.Status || "N/A"}</td>
                            <td className="td">{candidate.Remarks || "N/A"}</td>
                            <td className="td">
                                {" "}
                                <Button>Update</Button>
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
        </>
    );
};

export default CanididatesList;
