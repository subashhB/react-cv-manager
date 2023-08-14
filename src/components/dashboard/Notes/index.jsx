import React, { useEffect, useState } from "react";

const Notes = () => {
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);

    useEffect(() => {
        const localStorageNotes = localStorage.getItem("notes") || [];
        setNotes(localStorageNotes);
    }, []);

    return <div>Notes App</div>;
};

export default Notes;
