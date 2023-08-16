import React from "react";
import { useParams } from "react-router-dom";
import Letter from "../../../components/offerletter/Letter";

const LetterPage = () => {
    const { id } = useParams();
    return (
        <div>
            <Letter id={id} />
        </div>
    );
};

export default LetterPage;
