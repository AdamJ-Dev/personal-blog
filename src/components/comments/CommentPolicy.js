import { useTheme } from "../../hooks/useTheme";

const CommentPolicy = () => {
    const { theme } = useTheme()
    
    return (
        <div className={`comment-policy px-3 comment-section-text-${theme}`}>
            <p>The owner of this site reserves the right to remove all comments which he deems to be:</p>
            <ul>
                <li>Spam;</li>
                <li>Inciting violence;</li>
                <li>Violating of privacy;</li>
                <li>Infringing on Copyright; or else</li>
                <li>Egregiously offensive.</li>
            </ul>
            <p>He stresses that you are responsible for your comment, and to think before you post.</p>
        </div>
        );
}
 
export default CommentPolicy;