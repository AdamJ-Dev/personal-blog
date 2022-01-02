import PageNav from "../PageNav"
import "../css/BlogList.css"
import BlogLink from "./BlogLink"



const BlogList = ({blogs, allBlogs, pageNumber, destroyable}) => {
    const totalNumBlogs = allBlogs.length
    const totalNumDisplayedBlogs = blogs.length

    return (
    <div className="blog-list">
        {blogs.map((blog, index) => (
            <BlogLink key={blog.id} blog={blog} index={index} destroyable={destroyable} totalNumDisplayedBlogs={totalNumDisplayedBlogs}/>
        )) 
        }
        {!!totalNumBlogs && pageNumber !== 0 && <PageNav numPages={Math.ceil(totalNumBlogs/6)} page={pageNumber} destroyable={ destroyable }></PageNav>}
    </div>
    )
}

export default BlogList