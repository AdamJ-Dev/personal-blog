import { useState } from "react";
import CreateComment from "./CreateComment";
import "../css/Comment.css"
import { useTheme } from "../../hooks/useTheme";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import DepthSkew from "./DepthSkew";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import DeleteWithPasscodeForm from "../auth/DeleteWithPasscodeForm";
import dotenv from "dotenv"

dotenv.config()


const Comment = ({ comment }) => {
    const { user } = useAuthContext()
    const [isReplying, setIsReplying] = useState(false)
    const { theme } = useTheme()

    console.log(process.env.REACT_APP_ADMIN_UID, comment.userId)

    return (
        <div className={`ms-4 comment-box  border-${theme}`}>
            <div className="d-flex skewed-comment w-100">
                <DepthSkew depth={comment.depth} key={comment.id}/>
                <div className="comment w-100">
                    <div className={`comment-title mt-2 comment-section-text-${theme} ${comment.userId===process.env.REACT_APP_ADMIN_UID && `admin-comment-title-${theme}`}`}><strong>{comment.author}</strong></div>
                    <ReactMarkdown className={`comment-body comment-body-${theme} comment-section-text-${theme}`} children={comment.body} components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                        <SyntaxHighlighter
                            children={String(children).replace(/\n$/, '')}
                            style={ tomorrowNight }
                            language={ match[1] }
                            PreTag="div"
                            {...props}
                        />
                        ) : (
                        <code className={className} {...props}>
                            {children}
                        </code>
                        )
                    }
                    }} remarkPlugins={[remarkGfm]}/>
                    {!isReplying && <div className="mb-2" onClick={() => setIsReplying(!isReplying)}><span className="reply-link text-sm">Reply</span></div>}
                    {isReplying && <CreateComment blogId={comment.blogId} parent={comment} isReply={true} setIsReplying={setIsReplying}/>}
                    {user && <DeleteWithPasscodeForm collection={"comments"} document={comment}/>}
                </div>
            </div>
        </div>
       
    );
}

export default Comment

