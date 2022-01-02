import { Link } from "react-router-dom";
import replaceAll from "../../helpers/replaceAll";
import { useAuthContext } from "../../hooks/auth/useAuthContext";
import { useTheme } from "../../hooks/useTheme";
import DeleteWithPasscodeForm from "../auth/DeleteWithPasscodeForm";

const BlogLink = ({blog, index, destroyable, totalNumDisplayedBlogs}) => {
    const { theme } = useTheme();
    const { user } = useAuthContext();
    
    return (
        <div className="blog-link my-3">
            <Link to={`/blogs/${ replaceAll(blog.title, " ", "-") }`}>
                <h4 className={`blog-link-title blog-link-title-${theme}`}>{ blog.title }</h4>
                <p className={`blog-link-date blog-link-date-${theme}`}><small>{ blog.date }</small></p>
            </Link>
            {destroyable && <DeleteWithPasscodeForm collection={"blogs"} document={blog}/>}
            {index !== (totalNumDisplayedBlogs - 1) && <hr className="blog-splitter"/>}
        </div>
      );
}
 
export default BlogLink;