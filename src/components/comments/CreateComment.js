import { useState } from "react";
import { Link } from "react-router-dom";
import "../css/CreateComment.css"
import useWrite from "../../hooks/firestore/useWrite";
import CommentPolicyDialog from "./CommentPolicyDialog";
import { useTheme } from "../../hooks/useTheme";
import { useAuthContext } from "../../hooks/auth/useAuthContext";

const CreateComment = ({ blogId, parent, isReply, setIsReplying}) => {
    const [author, setAuthor] = useState("")
    const [body, setBody] = useState("");
    const [isPolicyOpen, setIsPolicyOpen] = useState(false);
    const { addDocument, response } = useWrite("comments");
    const { theme } = useTheme();
    const [isPolicyAccepted, setIsPolicyAccepted] = useState(false)
    const { user } = useAuthContext()
    
    const handleSubmit = async e => {
        const form = e.target 
        
        e.preventDefault();
        await addDocument({
            author,
            body, 
            blogId,
            depth: parent.depth + 1,
            parentId: parent.id,
            userId: user.uid ? user.uid: null 
        });
        if (isReply) setIsReplying(false);
        if (!isReply) document.getElementById("accept-comment-policy").click();
        form["comment-author"].value = ""
        form["comment-body"].value = ""
    }

    return (
        <div className={`new-comment p-2 mt-2`}>
            <h5 className={`d-inline comment-section-text-${theme}`}>Your {isReply ? "reply": "comment"}:</h5>
            {isReply && <span className="close-reply-wrap"><i onClick={() => setIsReplying(false)} className={`bi bi-x close-reply close-reply-${theme} mt-1`} style={{float: "right"}}></i></span>}
            <form onSubmit={handleSubmit} className="comment-form">
                <input id="comment-author-field" name="comment-author" onChange={(e) => setAuthor(e.target.value)} type="text" className={`form-control mt-3 create-comment-field-${theme}`} autoComplete="off" placeholder="Name" required/>
                <textarea name="comment-body" id="comment-body-field" onChange={(e) => setBody(e.target.value)} className={`form-control mt-3 create-comment-field-${theme}`} placeholder="Thoughts" required>
                </textarea>
                <label className={`comment-body-label form-label comment-section-text-${theme}`} htmlFor="comment-body-field" style={{float: "right"}}><a href="https://www.markdownguide.org/basic-syntax/">markdown</a>-interpreted</label>
                <br/>
                <label htmlFor="accept-comment-policy" className={`form-check-label me-2 comment-section-text-${theme}`}>I have read and understood the <Link to="" onClick={() => setIsPolicyOpen(true)}>comment policy</Link></label>
                <input className="form-check-input" id="accept-comment-policy" type="checkbox" name="accepted" onChange={() => setIsPolicyAccepted(!isPolicyAccepted)} required/>
                <CommentPolicyDialog isPolicyOpen={isPolicyOpen} isPolicyAccepted={isPolicyAccepted} setIsPolicyOpen={setIsPolicyOpen}/>
                <br />
                <button type="submit" id="submit-comment" className="btn btn-sm btn-primary mt-3">{!response.isPending ? "Post": "Adding comment..."}</button>
            </form>
        </div>
        
    );
        
}
 
export default CreateComment;