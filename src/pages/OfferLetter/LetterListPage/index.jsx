import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import LetterList from "../../../components/offerletter/LetterList";

const LetterListPage = () => {
    const [letters, setLetters] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3001/OfferLetters")
            .then((response) => setLetters(response.data));
    }, []);

    return (
        <div>
            <LetterList letters={letters} />
        </div>
    );
};

export default LetterListPage;
