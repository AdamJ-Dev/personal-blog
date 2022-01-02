import useRead from "../../hooks/firestore/useRead";
import { orderComments } from "../../helpers/queueComments";
import Comments from "./Comments";
import { useTheme } from "../../hooks/useTheme";
import "../css/CommentSection.css"
import CreateComment from "./CreateComment";


const CommentSection = ({ blogId, blogTitle }) => {
    const { theme } = useTheme()
    const order = { orderBy: "date", direction: "asc" }
    const test = { field: "blogId", operator: "==", value: blogId }
    const { error, isPending, docs} = useRead("comments", { test, order }, true)

    const comments = orderComments(docs)

    const handleGoToComment = () => {
        const createComment = document.getElementById("create-comment");
        createComment.scrollIntoView();
    }

    return (  
        <div className="comment-section border pt-4 pb-3 px-3 col-10 mt-3">
            { isPending && <div className={`comment-section-text-${theme}`}>Loading comments...</div> }
            <h2 className={`d-inline comment-section-title comment-section-title-${theme}`}>Discussion: {blogTitle}</h2>
            {!!comments.length && <span className="go-to-comment-wrap" style={{float: "right"}}><span className={`comment-section-text-${theme}`}>Go to </span><span className="go-to-comment" onClick={handleGoToComment}>comment</span></span>}
            {!!comments.length && <p className={`comment-section-text-${theme}`}>({comments.length} comments)</p>}
            {!!comments.length && <Comments comments={comments}/>}
            {!comments.length && <p className={`mt-3 comment-section-text-${theme}`}>No comments were found.</p> }
            <div id="create-comment"></div>
            <CreateComment blogId={blogId} parent={{depth: -1, id: null}} isReply={false}/>  
        </div>
    );
}
 
export default CommentSection;