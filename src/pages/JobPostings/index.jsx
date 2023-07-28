import React from "react";
import JobPostsList from "../../components/common/jobPostings/JobPostsList";
import JobPostingForm from "../../components/common/jobPostings/JobPostingForm";

const JobPostings = () => {
    return (
        <div>
            <JobPostingForm />
            <JobPostsList />
        </div>
    );
};

export default JobPostings;
