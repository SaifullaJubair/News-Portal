
"use client";
import { useCallback, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ImageUploader from "../news/ImageUploader";

const Test = ({ initialData }) => {
    const [terms_condition, setterms_condition] = useState(initialData?.terms_condition);

    const reactQuillRef = useRef(null);

    // terms_condition post
    const handleDataPost6 = async () => {
        toast.error("Please wait a moment");
        const sendData = {
            terms_condition: terms_condition,
            _id: initialData?._id,
        };
        (sendData);
    };

    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                const imageUpload = await ImageUploader(file);
                const url = imageUpload[0];
                (url);
                const quill = reactQuillRef.current;
                if (quill) {
                    const range = quill.getEditorSelection();
                    range && quill.getEditor().insertEmbed(range.index, "image", url);
                }
            }
        };
    }, [reactQuillRef]);

    return (
        <>
            <ReactQuill
                ref={reactQuillRef}
                theme="snow"
                placeholder="Start writing..."
                modules={{
                    toolbar: {
                        container: [
                            [{ header: "1" }, { header: "2" }, { font: [] }],
                            [{ size: [] }],
                            ["bold", "italic", "underline", "strike", "blockquote"],
                            [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
                            ["link", "image", "video"],
                            ["code-block"],
                            ["clean"],
                        ],
                        handlers: {
                            image: imageHandler,
                        },
                    },
                    clipboard: {
                        matchVisual: false,
                    },
                }}
                formats={[
                    "header",
                    "font",
                    "size",
                    "bold",
                    "italic",
                    "underline",
                    "strike",
                    "blockquote",
                    "list",
                    "bullet",
                    "indent",
                    "link",
                    "image",
                    "video",
                    "code-block",
                ]}
                value={terms_condition}
                onChange={setterms_condition}
            />


            <div className="mt-2 flex items-center justify-end">
                <button
                    onClick={() => handleDataPost6()}
                    type="submit"
                    className="btn bg-green-500 hover:bg-green-400 text-white border border-gray-300 rounded-md px-5 py-2"
                >
                    Submit
                </button>
            </div>
        </>
    );
};

export default Test;
