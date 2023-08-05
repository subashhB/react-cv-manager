import React, { useEffect, useState } from "react";
import JobPostsList from "../../components/jobPostings/JobPostsList";
import JobPostingForm from "../../components/jobPostings/JobPostingForm";
import axios from "axios";

const JobPostingPage = () => {
    const [jobPostList, setJobPostList] = useState([]);
    const [jobToUpdate, setJobToUpdate] = useState(null);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/JobPostings/${id}`);
        setJobPostList((prev) => prev.filter((job) => job.id !== id));
    };

    const handleEdit = (jobPost, selectedJobPosition) => {
        delete jobPost.JobPosition;
        axios
            .put(`http://localhost:3001/JobPostings/${jobToUpdate.id}`, jobPost)
            .then((response) => {
                setJobPostList((prev) =>
                    prev.map((item) =>
                        item.id !== jobPost.id
                            ? item
                            : {
                                  ...response.data,
                                  JobPosition: selectedJobPosition,
                              }
                    )
                );
                setJobToUpdate(null);
            });
    };
    const passJobToFormForEdit = (job) => {
        setJobToUpdate(job);
    };

    useEffect(() => {
        axios
            .get("http://localhost:3001/JobPostings?_expand=JobPosition")
            .then((response) => {
                setJobPostList(response.data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div className="pages">
            <JobPostingForm
                setJobPostList={setJobPostList}
                jobToUpdate={jobToUpdate}
                setJobToUpdate={setJobToUpdate}
                handleEdit={handleEdit}
            />
            <JobPostsList
                jobPostList={jobPostList}
                passJobToFormForEdit={passJobToFormForEdit}
                handleDelete={handleDelete}
            />
        </div>
    );
};

export default JobPostingPage;
