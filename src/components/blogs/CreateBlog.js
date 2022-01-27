import "../css/CreateBlog.css"
import useWrite from "../../hooks/firestore/useWrite";
import BlogForm from "./BlogForm";

const CreateBlog = () => {
    const { addDocumentWithPasscode, response } = useWrite("blogs")
    
    const handleUpload = async (title, body, passcode) => {
        await addDocumentWithPasscode({ title, body }, passcode, "create-blog")
    }

    return ( 
        <BlogForm initialBlog={{ title: "", body: "" }} handleUpload={handleUpload} response={response}/>
     );
}
 
export default CreateBlog;