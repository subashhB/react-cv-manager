import { Button } from "@mui/material";
import React from "react";

const LetterList = ({ letters }) => {
    const tableHeads = [
        { id: 1, heading: "S.No." },
        { id: 2, heading: "Title" },
        { id: 3, heading: "Status" },
        { id: 4, heading: "Actions" },
    ];
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
                            <td className="td">{letter.Status}</td>
                            <td className="td">
                                <Button>Preview</Button>
                                <Button
                                    color="secondary"
                                    disabled={letter.Status === "Sent"}
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
