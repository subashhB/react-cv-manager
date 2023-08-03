import React from "react";
import { Link, Outlet } from "react-router-dom";
import { ApplicantsContextProvider } from "./context/ApplicantsProvider";
import { Tab, Tabs } from "@mui/material";

const ApplicantsPage = () => {
    return (
        <ApplicantsContextProvider>
            <div className="pages">
                <Tabs>
                    <Link to="/applicants">
                        <Tab label="Applicants" />
                    </Link>
                    <Link to="/applicants/blacklist">
                        <Tab label="Black LIst" />
                    </Link>
                </Tabs>
                <Outlet />
            </div>
        </ApplicantsContextProvider>
    );
};

export default ApplicantsPage;
