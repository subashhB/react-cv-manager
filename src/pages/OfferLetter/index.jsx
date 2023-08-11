import React from "react";
import { Outlet } from "react-router-dom";

const OfferLetterPage = () => {
    return (
        <div className="pages">
            <Outlet />
        </div>
    );
};

export default OfferLetterPage;
