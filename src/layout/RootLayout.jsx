import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const RootLayout = () => {
    return (
        <div className="flex bg-zinc-100 w-full h-screen">
            <Sidebar />

            <div className="ms-16">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;
