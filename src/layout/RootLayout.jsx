import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

const RootLayout = () => {
    return (
        <div className="flex bg-zinc-100  h-full">
            <Sidebar />

            <div className="ms-16 mb-4  max-w-screen overflow-hidden">
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
};

export default RootLayout;
