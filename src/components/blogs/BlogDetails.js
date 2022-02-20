import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useTheme } from "../../hooks/useTheme";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import "../css/BlogDetails.css"
import CommentSection from "../comments/CommentSection";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { Link } from "react-router-dom";
import useRead from "../../hooks/firestore/useRead";

const BlogDetails = ({ blog }) => {
    const { theme } = useTheme();
    const { user } = useAuthContext();

    // Get comments (without any ordering) so we know how many
    const test = { field: "blogId", operator: "==", value: blog.id }
    const { docs } = useRead("comments", { test }, true)
    const numComments = docs.length

    const scrollToTop = () => {
        document.body.scrollTop = 0; 
        document.documentElement.scrollTop = 0; 
    }

    const handleGoToCommentSection = () => {
        const commentSection = document.getElementById("start-comment-section");
        commentSection.scrollIntoView();
    }

    return (  
        <div className="blog-details row mt-4 d-flex justify-content-center">
            <article className="col-10">
                    { user && <span style={{float: "right"}}><Link className={`blog-details-edit blog-details-edit-${theme}`} to={`/auth/create/${blog.title}`}>Edit</Link></span> }
                    <h1 className={`blog-details-title blog-details-title-${theme}`} style={{maxWidth: "70%"}}>{ blog.title }</h1>
                    <p className={`d-inline blog-details-date blog-details-date-${theme}`}><small>{ blog.date }</small></p>
                    <div className={`blog-details-chat-link blog-details-chat-link-${theme} mt-2`} onClick={ handleGoToCommentSection }>
                        <i className="bi bi-chat-right"></i>
                        { !!numComments && <span>    {numComments}</span> }
                    </div>
                    <hr/>
                    
                    <ReactMarkdown className={`blog-body blog-body-${theme}`} children={blog.body} components={{
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
            <hr className={`hr-${theme}`}/>
            </article>
            <div id="start-comment-section"></div>
            <CommentSection blogId={blog.id} blogTitle={blog.title} />   
            <div className="text-center my-3" onClick={() => scrollToTop()}><span className="scroll-to-top">Top</span></div>
        </div>
        
    );
}
 
export default BlogDetails;