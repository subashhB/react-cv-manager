import React from "react";

const InterviewerList = ({ interviewers }) => {
    const tableHead = [
        { id: 1, title: "S.No." },
        { id: 2, title: "Full Name" },
        { id: 3, title: "E-mail" },
        { id: 4, title: "Phone No." },
    ];
    return (
        <table className="table">
            <thead className="thead">
                {tableHead.map((heading) => (
                    <th className="th" key={heading.id}>
                        {heading.title}
                    </th>
                ))}
            </thead>
            <tbody>
                {interviewers?.map((interviewer, i) => (
                    <tr className="tr" key={interviewer.id}>
                        <td className="td">{i + 1}</td>
                        <td className="td">{interviewer.Name}</td>
                        <td className="td">{interviewer.Email}</td>
                        <td className="td">{interviewer.Phone}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default InterviewerList;
