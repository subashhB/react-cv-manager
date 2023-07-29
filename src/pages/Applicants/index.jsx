import React from "react";
import { Outlet } from "react-router-dom";
import { ApplicantsContextProvider } from "./context/ApplicantsProvider";

const ApplicantsPage = () => {
    return (
        <ApplicantsContextProvider>
            <div>
                ApplicantsPage
                <Outlet />
            </div>
        </ApplicantsContextProvider>
    );
};

export default ApplicantsPage;
