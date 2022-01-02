import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import handleTab from "../../helpers/handleTab";
import { Link } from "react-router-dom"
import { cleanDateNoTime } from "../../helpers/cleanDate";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useTheme } from "../../hooks/useTheme"
import { useEffect, useState } from "react";


const BlogForm = ({ initialBlog, handleUpload, response }) => {
    const { title: initialTitle, body: initialBody, date} = initialBlog;
    const [title, setTitle] = useState(initialTitle);
    const [body, setBody] = useState(initialBody);
    const [passcode, setPasscode] = useState("");
    const { error, isPending } = response;
    const { theme } = useTheme();

    useEffect(() => {
        if (title && setTitle && setBody) { // if an existing blog was initialised and setters are ready
            setTitle(title);
            setBody(body); 
        };
    }, [setTitle, setBody]);

    const handleSubmit = e => {
        e.preventDefault();
        handleUpload(title, body, passcode);
        if (response.success) window.location.assign("/");
    }  

    return (
        <div className={`create container mt-4 create-${theme}`}>
            <div className="row">
                <form onSubmit={handleSubmit} className="create-blog-form col-6">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input id="title" value={title} className="form-control mb-3" name="title" type="text" onChange={e => setTitle(e.target.value)} required/>
                    <label htmlFor="body" className="form-label">Body:</label>
                    <textarea name="body" value={body} id="body" className="form-control mb-3" onKeyDown={e => setBody(handleTab(e))} onChange={e => setBody(e.target.value)} required></textarea>
                    <input name="passcode" type="password" className="form-control mb-3" onChange={ (e) => setPasscode(e.target.value) } placeholder="Enter passcode" required/>
                    {error && <p className="text-danger">{error}</p>}
                    {!isPending ? <button type="submit" className="btn btn-primary mb-3">Post</button>: <button className="btn btn-primary mb-3" disabled>Loading...</button>}
                    <div className="row fluid-container mt-2">
                        <Link to="/auth" className="auth-nav-link">Auth Navigation</Link>
                    </div>
                </form>
                <div className="ms-3 blog-preview col-5">
                    <h5 className="preview mb-3">Preview:</h5>
                    <h1>{title}</h1>
                    {title && <div className="title-region"><p><small>{date ? date: cleanDateNoTime(Date())}</small></p><hr/></div>}
                    <ReactMarkdown children={body} components={{
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
                </div>
            </div>
        </div>
    );
}
 
export default BlogForm;