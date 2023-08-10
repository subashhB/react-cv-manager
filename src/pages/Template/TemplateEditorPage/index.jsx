import React from "react";
import TemplateEditor from "../../../components/template/TemplateEditor";
import { useParams } from "react-router-dom";

const TemplateEditorPage = () => {
    const { id } = useParams();
    return (
        <div>
            <TemplateEditor id={id} />
        </div>
    );
};

export default TemplateEditorPage;
