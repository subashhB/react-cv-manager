import { List, ListItem } from "@chakra-ui/react";
import { ListItemText } from "@mui/material";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const TemplateList = () => {
    const [templates, setTemplates] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/LetterTemplates")
            .then((response) => setTemplates(response.data));
    }, []);
    return (
        <div>
            <List className="p-2">
                {templates.map((template) => (
                    <Link to={`/template/editor/${template.id}`}>
                        <ListItem
                            key={template.id}
                            className="px-3 py-2  hover:bg-zinc-100 rounded"
                        >
                            <ListItemText className="ms-4">
                                {template.LetterType}
                            </ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </div>
    );
};

export default TemplateList;
