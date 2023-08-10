import React from "react";
import { Outlet } from "react-router-dom";

const TemplatePage = () => {
    return (
        <div className="pages">
            <Outlet />
        </div>
    );
};

export default TemplatePage;
