import React, { useEffect, useState } from "react";
import InterviewerList from "../../components/interviewer";
import axios from "axios";

const InterviewerPage = () => {
    const [interviewers, setInterviewers] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/Interviewers")
            .then((response) => setInterviewers(response.data));
    }, []);
    return (
        <div className="pages">
            <InterviewerList interviewers={interviewers} />
        </div>
    );
};

export default InterviewerPage;
