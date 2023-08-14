import { Box } from "@mui/material";
import React from "react";
import Notes from "../../components/dashboard/Notes";

const Dashboard = () => {
    return (
        <div className="pages">
            <Box>
                <Notes />
            </Box>
        </div>
    );
};

export default Dashboard;
