import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const RootLayout = () => {
    return (
        <div className="flex">
            <Sidebar />

            <div className="ms-16">
                <Navbar />
                <div className="m-2">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
