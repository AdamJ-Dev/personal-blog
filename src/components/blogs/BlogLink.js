import { Link } from "react-router-dom";
import replaceAll from "../../helpers/replaceAll";
import { useTheme } from "../../hooks/useTheme";
import DeleteWithPasscodeForm from "../auth/DeleteWithPasscodeForm";

const BlogLink = ({blog, index, destroyable, totalNumDisplayedBlogs}) => {
    const { theme } = useTheme();
   
    return (
        <div className="blog-link my-3">
            <div className="m-auto" style={{maxWidth: "70%"}}>
            <Link to={`/blogs/${ replaceAll(blog.title, " ", "-") }`} >
                <h4 className={`blog-link-title blog-link-title-${theme}`}>{ blog.title }</h4>
                <p className={`blog-link-date blog-link-date-${theme}`}><small>{ blog.date }</small></p>
            </Link>
            {destroyable && <DeleteWithPasscodeForm collection={"blogs"} document={blog}/>}
            </div>
            {index !== (totalNumDisplayedBlogs - 1) && <hr className="blog-splitter"/>}
        </div>
      );
}
 
export default BlogLink;