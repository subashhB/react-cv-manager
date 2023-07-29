import axios from "axios";
import React, { useEffect, useState } from "react";

const JobPostingForm = ({
    setJobPostList,
    jobToUpdate,
    setJobToUpdate,
    handleEdit,
}) => {
    const initialState = {
        JobPositionId: 1,
        NumberOfOpenings: "",
        PublishedOn: new Date().toISOString(),
        ApplicationFromDate: "",
        ApplicationExpiryDate: "",
        JobApplicationStatusId: 1,
    };
    const [jobPositions, setJobPositions] = useState([]);
    const [jobPost, setJobPost] = useState(initialState);

    useEffect(() => {
        if (jobToUpdate) {
            setJobPost(jobToUpdate);
        }
        axios
            .get("http://localhost:3001/JobPositions")
            .then((response) => {
                setJobPositions(response.data);
            })
            .catch((erorr) => console.error(erorr));
    }, [jobToUpdate]);
    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedJobPosition = jobPositions.find(
            (job) => job.id === jobPost.JobPositionId
        );
        if (jobToUpdate) {
            handleEdit(jobPost, selectedJobPosition);
            setJobPost(initialState);
        } else {
            axios
                .post("http://localhost:3001/JobPostings", jobPost)
                .then((response) => {
                    setJobPost(initialState);
                    setJobPostList((prev) => [
                        ...prev,
                        {
                            ...response.data,
                            JobPosition: selectedJobPosition,
                        },
                    ]);
                });
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select
                    value={jobPost.JobPositionId}
                    name="JobPositionId"
                    onChange={(e) =>
                        setJobPost({
                            ...jobPost,
                            JobPositionId: parseInt(e.target.value),
                        })
                    }
                    required
                >
                    {jobPositions.map((jobPosition) => (
                        <option key={jobPosition.id} value={jobPosition.id}>
                            {jobPosition.Name}
                        </option>
                    ))}
                </select>
                <input
                    min={0}
                    type="number"
                    value={jobPost.NumberOfOpenings}
                    onChange={(e) => {
                        setJobPost({
                            ...jobPost,
                            NumberOfOpenings: e.target.valueAsNumber,
                        });
                    }}
                    placeholder="Number of Openings"
                    required
                />
                <input
                    type="date"
                    value={jobPost.ApplicationFromDate}
                    onChange={(e) =>
                        setJobPost({
                            ...jobPost,
                            ApplicationFromDate: e.target.value,
                        })
                    }
                    required
                />
                <input
                    type="date"
                    value={jobPost.ApplicationExpiryDate}
                    onChange={(e) =>
                        setJobPost({
                            ...jobPost,
                            ApplicationExpiryDate: e.target.value,
                        })
                    }
                    required
                />
                <button type="submit">
                    {jobToUpdate ? "Edit the Job" : "Post a Job"}
                </button>
            </form>
        </div>
    );
};

export default JobPostingForm;
