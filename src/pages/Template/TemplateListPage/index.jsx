import React from "react";
import TemplateList from "../../../components/template/TemplateList";
import { Typography } from "@mui/material";

const TemplateListPage = () => {
    return (
        <div>
            <Typography variant="h4" component="h6">
                Templates
            </Typography>
            <TemplateList />
        </div>
    );
};

export default TemplateListPage;
