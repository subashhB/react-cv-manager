import React from "react";
import { Outlet } from "react-router-dom";
import { ApplicantsContextProvider } from "./context/ApplicantsProvider";

const ApplicantsPage = () => {
    return (
        <ApplicantsContextProvider>
            <div className="pages">
                ApplicantsPage
                <Outlet />
            </div>
        </ApplicantsContextProvider>
    );
};

export default ApplicantsPage;
