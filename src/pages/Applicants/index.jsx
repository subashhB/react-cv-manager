import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ApplicantsContextProvider } from "./context/ApplicantsProvider";

const ApplicantsPage = () => {
    const [value, setValue] = useState("1");
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
                        label="Black LIst"
                        onClick={() => {
                            setValue("2");
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
