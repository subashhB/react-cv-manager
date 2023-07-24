import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const RootLayout = () => {
    return (
        <div>
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default RootLayout;
