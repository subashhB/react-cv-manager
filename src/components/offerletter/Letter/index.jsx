import axios from "axios";
import React, { useEffect, useState } from "react";

const Letter = ({ id }) => {
    const [letter, setLetter] = useState(null);
    useEffect(() => {
        axios
            .get(`http://localhost:3001/OfferLetters/${id}`)
            .then((response) => {
                setLetter(response.data);
            });
    }, [id]);
    console.log(letter);
    return <div>Letter</div>;
};

export default Letter;
