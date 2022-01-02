import { useTheme } from "../../hooks/useTheme";
import Comment from "./Comment";

const Comments = ({ comments }) => {
    const { theme } = useTheme()

    return (
        <div className="comments">
            {comments.map(comment => <Comment key={comment.id} comment={comment}/>)}
        </div>
    );
}
 
export default Comments