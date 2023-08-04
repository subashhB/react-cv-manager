import { Tab, Tabs } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ApplicantsContextProvider } from "./context/ApplicantsProvider";

const ApplicantsPage = () => {
    const [value, setValue] = useState("1");
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        if (location.pathname === "/applicants") {
            setValue("1");
        } else if (location.pathname === "/applicants/shortlist") {
            setValue("2");
        } else if (location.pathname === "/applicants/candidates") {
            setValue("3");
        } else if (location.pathname === "/applicants/blacklist") {
            setValue("4");
        }
    }, [location.pathname]);
    const navigate = useNavigate();
    return (
        <ApplicantsContextProvider>
            <div className="pages">
                <Tabs value={value}>
                    <Tab
                        value="1"
                        label="Applicants"
                        onClick={() => {
                            setValue("1");
                            navigate("/applicants");
                        }}
                    />
                    <Tab
                        value="2"
                        label="Short List"
                        onClick={() => {
                            setValue("2");
                            navigate("/applicants/shortlist");
                        }}
                    />
                    <Tab
                        value="3"
                        label="Candidates"
                        onClick={() => {
                            setValue("3");
                            navigate("/applicants/candidates");
                        }}
                    />
                    <Tab
                        value="4"
                        label="Black List"
                        onClick={() => {
                            setValue("4");
                            navigate("/applicants/blacklist");
                        }}
                    />
                </Tabs>
                <Outlet />
            </div>
        </ApplicantsContextProvider>
    );
};

export default ApplicantsPage;
