import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";

const Letter = ({ id }) => {
    const editorRef = useRef();
    const [letter, setLetter] = useState(null);
    const [content, setContent] = useState("");
    useEffect(() => {
        axios
            .get(`http://localhost:3001/OfferLetters/${id}`)
            .then((response) => {
                setLetter(response.data);
                setContent(response.data.Letter);
            });
    }, [id]);
    const handleSendOfferLetter = () => {
        const sentLetter = {
            ...letter,
            Letter: content,
            Status: "Sent",
            Email: letter.Field,
        };
        axios
            .patch(
                `http://localhost:3001/OfferLetters/${letter.id}`,
                sentLetter
            )
            .then(() => {
                setLetter(sentLetter);
            });
    };
    const handleDraft = () => {
        const draftLetter = {
            ...letter,
            Letter: content,
            Status: "Draft",
            Email: letter.Email,
        };
        axios
            .patch(
                `http://localhost:3001/OfferLetters/${letter.id}`,
                draftLetter
            )
            .then(() => {
                setLetter(draftLetter);
            });
    };
    return (
        <div>
            <div>
                {letter && (
                    <>
                        <Typography variant="h5" sx={{ marginBottom: 3 }}>
                            Preview
                        </Typography>
                        <JoditEditor
                            config={
                                letter.Status === "Sent" && {
                                    readonly: true,
                                    toolbar: false,
                                }
                            }
                            ref={editorRef}
                            value={content}
                            onChange={(newContent) => setContent(newContent)}
                        />
                        {letter.Status !== "Sent" && (
                            <Box className="flex justify-end w-full my-3 gap-2">
                                <Button
                                    onClick={() => handleDraft()}
                                    disabled={letter.Letter === content}
                                >
                                    Save as Draft
                                </Button>
                                <Button
                                    color="secondary"
                                    onClick={() => handleSendOfferLetter()}
                                >
                                    Send Offer Letter
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Letter;
