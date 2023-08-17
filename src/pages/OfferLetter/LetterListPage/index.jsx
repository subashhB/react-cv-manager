import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import LetterList from "../../../components/offerletter/LetterList";
import { Box, Button } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

const LetterListPage = () => {
    const [letters, setLetters] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/OfferLetters")
            .then((response) => setLetters(response.data));
    }, []);

    return (
        <div>
            <LetterList letters={letters} setLetters={setLetters} />
            <Box className="fixed flex justify-end p-5 -ms-24 mb-5 gap-7 bottom-0 right-5  w-full">
                <Link to="/offerletter/create">
                    <Button className="rounded-lg " sx={{ paddingY: "1rem" }}>
                        <AiOutlinePlus size={22} />
                    </Button>
                </Link>
            </Box>
        </div>
    );
};

export default LetterListPage;
