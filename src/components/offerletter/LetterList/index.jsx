import { Button } from "@mui/material";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const LetterList = ({ letters, setLetters }) => {
    const tableHeads = [
        { id: 1, heading: "S.No." },
        { id: 2, heading: "Title" },
        { id: 3, heading: "E-mail Address" },
        { id: 4, heading: "Status" },
        { id: 5, heading: "Actions" },
    ];
    const handleSend = (letter) => {
        const updatedLetter = { ...letter, Status: "Sent" };
        axios
            .patch(
                `http://localhost:3001/OfferLetters/${letter.id}`,
                updatedLetter
            )
            .then(() => {
                setLetters((prev) =>
                    prev.map((item) =>
                        item.id !== letter.id ? item : updatedLetter
                    )
                );
            });
        console.log(letters);
    };
    return (
        <div>
            <table className="table">
                <thead className="thead">
                    <tr>
                        {tableHeads.map((head) => (
                            <th className="th" key={head.id}>
                                {head.heading}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {letters.map((letter, i) => (
                        <tr className="tr" key={letter.id}>
                            <td className="td">{i + 1}</td>
                            <td className="td">{letter.Title}</td>
                            <td className="td">{letter.Email}</td>
                            <td className="td">{letter.Status}</td>
                            <td className="td">
                                <Button>
                                    <Link to={`/offerletter/${letter.id}`}>
                                        {" "}
                                        Preview
                                    </Link>
                                </Button>
                                <Button
                                    color="secondary"
                                    disabled={letter.Status === "Sent"}
                                    onClick={() => handleSend(letter)}
                                >
                                    Send
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LetterList;
