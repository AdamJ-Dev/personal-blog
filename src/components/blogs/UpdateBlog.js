import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import replaceAll from "../../helpers/replaceAll";
import useRead from "../../hooks/firestore/useRead";
import useWrite from "../../hooks/firestore/useWrite";
import BlogForm from "./BlogForm";

const UpdateBlog = () => {
    const { title } = useParams();
    const test = {field: "title", operator: "==", value: replaceAll(title, "-", " ")};
    const {error, isPending, docs } = useRead("blogs", { test });
    const { updateDocumentWithPasscode , response } = useWrite("blogs");

    const handleUpload = async (title, body, passcode) => {
        if (docs.length) {
            await updateDocumentWithPasscode(docs[0].id, { title, body }, passcode);
        }
    }
    
    return (
        <div className="update-blog">
            {error && <p className="mt-4">{error}</p>}
            {isPending && <p className="mt-4">Loading...</p>}
            {!!docs.length && <BlogForm initialBlog={ docs[0] } handleUpload={ handleUpload } response={response} />}
        </div>
    );
}
 
export default UpdateBlog;