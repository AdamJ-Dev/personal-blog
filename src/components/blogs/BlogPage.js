import { useParams } from "react-router-dom"
import replaceAll from "../../helpers/replaceAll"
import useRead from "../../hooks/firestore/useRead"
import { useTheme } from "../../hooks/useTheme"
import BlogDetails from "./BlogDetails"


const BlogPage = () => {
    const { theme } = useTheme();
    const { title } = useParams();
    const test = {field: "title", operator: "==", value: replaceAll(title, "-", " ")};
    const {error, isPending, docs } = useRead("blogs", { test });

    return (
        <div className="container-fluid mb-4">
            { isPending && <div className="container">Loading...</div> }
            { error && <div className="container text-center" style={{color: theme === "dark" ? "#A9A9A9": "black"}}>{error}</div> }
            { !!docs.length && <BlogDetails blog={ docs[0] } />}
        </div>
      );
}
 


export default BlogPage;