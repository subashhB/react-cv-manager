import {
    Box,
    Button,
    List,
    ListItem,
    ListItemText,
    TextareaAutosize,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IoTrashBinOutline, IoPencilSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { useRef } from "react";

const Notes = () => {
    const initialNoteState = {
        id: "",
        title: "",
    };
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(initialNoteState);
    const bottomRef = useRef();

    useEffect(() => {
        const localStorageNotes =
            JSON.parse(localStorage.getItem("notes")) || [];
        setNotes(localStorageNotes);
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, []);

    const handleAddNote = () => {
        const newNote = {
            ...note,
            id: crypto.randomUUID(),
        };

        const newNotesArray = [...notes, newNote];
        localStorage.setItem("notes", JSON.stringify(newNotesArray));
        setNotes(newNotesArray);
        setNote(initialNoteState);
    };

    const handleDeleteNote = (id) => {
        const newNotesArray = notes.filter((item) => item.id !== id);
        localStorage.setItem("notes", JSON.stringify(newNotesArray));
        setNotes(newNotesArray);
    };
    return (
        <Box className="w-1/4 p-3 text-gray-700 rounded-lg shadow-lg">
            <Box className="flex items-center gap-3">
                <IoPencilSharp size={15} />
                <Typography className="mb-2">Notes</Typography>
            </Box>

            <Box className="w-full h-60 no-scrollbar overflow-y-auto">
                <List>
                    {notes.map((item) => (
                        <ListItem
                            key={item.id}
                            className=" rounded-lg shadow-sm hover:bg-blue-300"
                        >
                            <ListItemText className="w-5/6  whitespace-nowrap">
                                <span className="cursor-default">
                                    {item.title}
                                </span>
                            </ListItemText>
                            <Button
                                color="error"
                                className="rounded w-10 h-14  "
                                onClick={() => handleDeleteNote(item.id)}
                            >
                                <IoTrashBinOutline size={20} />
                            </Button>
                            <div ref={bottomRef}></div>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className="flex gap-1">
                <TextareaAutosize
                    className=" w-5/6 border border-gray-800 rounded-lg placeholder:ps-2 placeholder:text-sm"
                    minRows={2}
                    value={note.title}
                    onChange={(e) =>
                        setNote({ ...note, title: e.target.value })
                    }
                    placeholder="Somthing super important you might forget?..."
                />
                <Button className="rounded-lg" onClick={() => handleAddNote()}>
                    <AiOutlinePlus size={20} />
                </Button>
            </Box>
        </Box>
    );
};

export default Notes;
