import React from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const JobPostsList = ({ handleDelete, jobPostList, passJobToFormForEdit }) => {
    const tableHead = [
        { id: 1, title: "S.No" },
        { id: 2, title: "Position" },
        { id: 3, title: "No. of Positions" },
        { id: 4, title: "Published on" },
        { id: 5, title: "Application form Date" },
        { id: 6, title: "Application Expiry Date" },
        { id: 7, title: "Actions" },
    ];

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
                {jobPostList?.map((jobPost, i) => (
                    <tr key={jobPost.id}>
                        <td className="tw-td">{i + 1}</td>
                        <td className="tw-td">{jobPost.JobPosition.Name}</td>
                        <td className="tw-td">{jobPost.NumberOfOpenings}</td>
                        <td className="tw-td">{jobPost.PublishedOn}</td>
                        <td className="tw-td">{jobPost.ApplicationFromDate}</td>
                        <td className="tw-td">
                            {jobPost.ApplicationExpiryDate}
                        </td>
                        <td className="flex">
                            <div className="cursor-pointer">
                                <AiFillEdit
                                    size={20}
                                    onClick={() =>
                                        passJobToFormForEdit(jobPost)
                                    }
                                />
                            </div>
                            <div className="ms-5 cursor-pointer">
                                <AiFillDelete
                                    size={20}
                                    onClick={() => {
                                        handleDelete(jobPost.id);
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
