import { useEffect, useState } from "react";
import BlogList from "./BlogList";

const BlogSearch = ({allBlogs, search, destroyable}) => {
    const [blogs, setBlogs] = useState([])
    const [isPending, setIsPending] = useState(true)
    
    useEffect(() => {
        const normedSearch = search.toLowerCase()
        setBlogs(allBlogs.filter(blog => (blog.title.toLowerCase().includes(normedSearch) || blog.body.toLowerCase().includes(normedSearch))
        ))
        setIsPending(false)
    }, [allBlogs, search])

    return (
        <div className="blog-search">
            {isPending && <div>Searching...</div>}
            {!!blogs.length && <BlogList blogs={ blogs } allBlogs={allBlogs} pageNumber={0} destroyable = {destroyable}/>}
            {!blogs.length && <p className="text-secondary mt-2">No matching blogs</p>}  
        </div>
    );
}



export default BlogSearch;