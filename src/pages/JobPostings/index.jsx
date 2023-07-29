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
        console.log("Job Post", jobPost);
        console.log("selectedjobpost", selectedJobPosition);
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

    console.log("Job Post List", jobPostList);
    const passJobToFormForEdit = (job) => {
        setJobToUpdate(job);
    };

    useEffect(() => {
        axios
            .get("http://localhost:3001/JobPostings?_expand=JobPosition")
            .then((repsonse) => {
                setJobPostList(repsonse.data);
                console.log(repsonse);
            })
            .catch((error) => console.log(error));
    }, []);
    console.log("jobToUpdate", jobToUpdate);
    return (
        <div>
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
