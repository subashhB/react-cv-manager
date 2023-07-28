import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const JobPostsList = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const tableHead = [
        { id: 1, title: "S.No" },
        { id: 2, title: "Position" },
        { id: 3, title: "No. of Positions" },
        { id: 4, title: "Published on" },
        { id: 5, title: "Application form Date" },
        { id: 6, title: "Application Expiry Date" },
        { id: 7, title: "Actions" },
    ];

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/JobPostings/${id}`);
    };

    useEffect(() => {
        axios
            .get("http://localhost:3001/JobPostings?_expand=JobPosition")
            .then((repsonse) => {
                setJobPostings(repsonse.data);
                console.log(repsonse);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <table className="tw-table">
            <thead>
                <tr>
                    {tableHead.map((heading) => (
                        <th key={heading.id} className="tw-td">
                            {heading.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {jobPostings.map((jobPosting, i) => (
                    <tr key={jobPosting.id}>
                        <td className="tw-td">{i + 1}</td>
                        <td className="tw-td">{jobPosting.JobPosition.Name}</td>
                        <td className="tw-td">{jobPosting.NumberOfOpenings}</td>
                        <td className="tw-td">{jobPosting.PublishedOn}</td>
                        <td className="tw-td">
                            {jobPosting.ApplicationFromDate}
                        </td>
                        <td className="tw-td">
                            {jobPosting.ApplicationExpiryDate}
                        </td>
                        <td className="flex">
                            <AiFillEdit size={20} />
                            <div className="ms-5 cursor-pointer">
                                <AiFillDelete
                                    size={20}
                                    onClick={() => {
                                        handleDelete(jobPosting.id);
                                    }}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default JobPostsList;
