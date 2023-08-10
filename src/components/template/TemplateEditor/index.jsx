import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";

const TemplateEditor = ({ id }) => {
    const editorRef = useRef();
    const [content, setContent] = useState("");
    const [template, setTemplate] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:3001/LetterTemplates/${id}`)
            .then((response) => {
                setTemplate(response.data);
                setContent(response.data.Template);
            });
    }, [id]);
    const handleSaveTemplate = () => {
        const updatedTemplate = {
            ...template,
            Template: content,
        };
        axios
            .patch(
                `http://localhost:3001/LetterTemplates/${template.id}`,
                updatedTemplate
            )
            .then((response) => setTemplate(template));
    };
    console.log(id);
    console.log(template);
    return (
        <div className="m-4">
            {template && (
                <>
                    <Typography variant="h5" sx={{ marginBottom: 3 }}>
                        {template.LetterType} Template
                    </Typography>
                    <JoditEditor
                        ref={editorRef}
                        value={content}
                        onChange={(newContent) => setContent(newContent)}
                    />
                    <template>{content}</template>
                    <Box className="flex justify-end w-full my-3">
                        <Button
                            disabled={template.Template === content}
                            onClick={() => handleSaveTemplate()}
                        >
                            Save {template.LetterType} Template
                        </Button>
                    </Box>
                </>
            )}
        </div>
    );
};

export default TemplateEditor;
