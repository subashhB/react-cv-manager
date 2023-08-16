import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Preview = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [letterType, setLetterType] = useState("");
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
                    setLetterType(response.data?.LetterType);
                    setContent(offerLetter);
                });
        }
    }, [navigate, letterFields]);
    if (!letterFields) {
        return null;
    }

    const handleSendOfferLetter = () => {
        const letter = {
            Title: `${letterType} to ${letterFields.applicantName}`,
            Letter: content,
            Status: "Sent",
            Email: letterFields.email,
        };
        axios.post("http://localhost:3001/OfferLetters", letter);
        navigate("/offerletter");
    };
    const handleDraft = () => {
        const letter = {
            Title: `${letterType} to ${letterFields.applicantName}`,
            Letter: content,
            Status: "Draft",
            Email: letterFields.email,
        };
        axios.post("http://localhost:3001/OfferLetters", letter);
        navigate("/offerletter");
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
                    <Box className="flex justify-end w-full my-3 gap-2">
                        <Button onClick={() => handleDraft()}>
                            Save as Draft
                        </Button>
                        <Button
                            color="secondary"
                            onClick={() => handleSendOfferLetter()}
                        >
                            Send Offer Letter
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default Preview;
