import React, { useEffect, useState } from "react";
import SelectionComponent from "../../../components/offerletter/SelectionComponent";
import axios from "axios";

const SelectionPage = () => {
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/JobApplications?_expand=Applicants")
            .then((response) => {
                const hiredApplication = response.data.filter(
                    (item) => item.JobApplicationStatus === "Hired"
                );
                setApplications(hiredApplication);
            });
    }, []);
    console.log(applications);
    return (
        <div>
            <SelectionComponent applications={applications} />
        </div>
    );
};

export default SelectionPage;
