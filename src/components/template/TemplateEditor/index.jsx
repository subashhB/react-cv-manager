import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";

const TemplateEditor = () => {
    const editorRef = useRef();
    const [content, setContent] = useState("");
    return (
        <div>
            <JoditEditor
                ref={editorRef}
                value={content}
                onChange={(newContent) => setContent(newContent)}
            />
            <template>{content}</template>
        </div>
    );
};

export default TemplateEditor;
