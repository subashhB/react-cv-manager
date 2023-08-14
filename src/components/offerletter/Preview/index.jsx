import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const letterFields = location.state?.letterFields;

    useEffect(() => {
        if (!letterFields) {
            navigate("/offerletter");
        } else {
            axios
                .get("http://localhost:3001/LetterTemplates/2")
                .then((response) => {
                    const hrDetails = {
                        hrName: "Riju Shrestha",
                        hrTitle: "Talent Acquisition and Outreach Specialist",
                    };
                    const template = response.data?.Template;
                    const offerLetter = template
                        .replace("{date}", letterFields.date)
                        .replace("{applicantName}", letterFields.applicantName)
                        .replaceAll("{jobTitle}", letterFields.jobTitle)
                        .replace("{department}", letterFields.department)
                        .replace(
                            "{negotiatedSalary}",
                            letterFields.negotiatedSalary
                        )
                        .replace("{HR Name}", hrDetails.hrName)
                        .replace("{HR Title}", hrDetails.hrTitle);
                    setContent(offerLetter);
                });
        }
    }, [navigate, letterFields]);
    if (!letterFields) {
        return null;
    }

    const handleSendOfferLetter = () => {
        console.log(`Offer Letter sent to ${letterFields.email}`);
    };
    return (
        <div>
            {letterFields && (
                <>
                    <Typography variant="h5" sx={{ marginBottom: 3 }}>
                        Preview
                    </Typography>
                    <JoditEditor
                        config={{ readonly: true, toolbar: false }}
                        ref={editorRef}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                    <template>{content}</template>
                    <Box className="flex justify-end w-full my-3">
                        <Button onClick={() => handleSendOfferLetter()}>
                            Send FOffer Letter
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default Preview;
