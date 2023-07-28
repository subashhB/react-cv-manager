import axios from "axios";
import React, { useEffect, useState } from "react";

const JobPostingForm = () => {
    const initialState = {
        JobPositionId: 1,
        NumberOfOpenings: 0,
        PublishedOn: new Date(),
        ApplicationFromDate: "",
        ApplicationExpiryDate: "",
        JobApplicationStatusId: 1,
    };
    const [jobPositions, setJobPositions] = useState([]);
    const [jobPosting, setJobPositing] = useState(initialState);

    useEffect(() => {
        axios
            .get("http://localhost:3001/JobPositions")
            .then((response) => setJobPositions(response.data))
            .catch((erorr) => console.error(erorr));
    }, []);
    console.log(jobPosting);
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/JobPostings", jobPosting)
            .then(setJobPositing(initialState));
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select
                    value={jobPosting.JobPositionId}
                    name="JobPositionId"
                    onChange={(e) =>
                        setJobPositing({
                            ...jobPosting,
                            JobPositionId: e.target.value,
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
                    type="text"
                    value={jobPosting.NumberOfOpenings}
                    onChange={(e) => {
                        setJobPositing({
                            ...jobPosting,
                            NumberOfOpenings: parseInt(e.target.value),
                        });
                    }}
                    placeholder="Number of Openings"
                    required
                />
                <input
                    type="date"
                    value={jobPosting.ApplicationFromDate}
                    onChange={(e) =>
                        setJobPositing({
                            ...jobPosting,
                            ApplicationFromDate: e.target.value,
                        })
                    }
                    required
                />
                <input
                    type="date"
                    value={jobPosting.ApplicatoinExpiryDate}
                    onChange={(e) =>
                        setJobPositing({
                            ...jobPosting,
                            ApplicationExpiryDate: e.target.value,
                        })
                    }
                    required
                />
                <button type="submit">Post a Job</button>
            </form>
        </div>
    );
};

export default JobPostingForm;
