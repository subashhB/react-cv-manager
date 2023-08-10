import React, { useEffect, useState } from "react";
import InterviewCalendar from "../../components/interview/InterviewCalendar";
import axios from "axios";

const InterviewPage = () => {
    const [applicants, setApplicants] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [interviewers, setInterviewers] = useState([]);
    const [interviews, setInterviews] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/Applicants")
            .then((response) => setApplicants(response.data));
        axios
            .get("http://localhost:3001/Interviewers")
            .then((response) => setInterviewers(response.data));
        axios
            .get("http://localhost:3001/Interviews?_expand=Candidates")
            .then((response) => setInterviews(response.data));
        axios
            .get("http://localhost:3001/Candidates")
            .then((response) => setCandidates(response.data));
    }, []);
    const handleDeleteInterview = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/Interviews/${id}`);
        } catch (error) {
            console.log(error);
        }
    };
    const handleAddNewInterview = (id, interviewState) => {
        console.log("Trigger");
        setInterviews((prev) => [
            ...prev,
            {
                ...interviewState,
                id: id,
            },
        ]);
        console.log(interviews);
    };
    return (
        <div className="pages">
            <InterviewCalendar
                applicants={applicants}
                interviewers={interviewers}
                interviews={interviews}
                candidates={candidates}
                setInterviews={setInterviews}
                handleDeleteInterview={handleDeleteInterview}
                handleAddNewInterview={handleAddNewInterview}
            />
        </div>
    );
};

export default InterviewPage;
