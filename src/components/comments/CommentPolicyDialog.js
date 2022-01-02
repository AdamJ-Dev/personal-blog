import { Dialog, DialogTitle } from "@mui/material";
import CommentPolicy from "./CommentPolicy";
import "../css/CommentPolicyDialog.css"
import { useTheme } from "../../hooks/useTheme";

const CommentPolicyDialog = ({isPolicyOpen, isPolicyAccepted, setIsPolicyOpen}) => {
    const { theme } = useTheme()

    const handleUnderstoodPolicy = () => {
        if (!isPolicyAccepted) {
            document.getElementById("accept-comment-policy").click();
        }
        setIsPolicyOpen(false);
    }

    return (
        <Dialog open={isPolicyOpen} className={`comment-policy-dialog comment-policy-dialog-${theme}`} disableScrollLock>
            <div className="comment-policy-dialog-background">
                <DialogTitle className="dialog-title">
                    <p className={`d-inline  comment-section-text-${theme}`}>Comment Policy</p>
                    <span className="close-dialog-wrap"><i onClick={() => setIsPolicyOpen(false)} className={`bi bi-x close-dialog close-dialog-${theme}`} style={{float: "right"}}></i></span>
                </DialogTitle>
                <CommentPolicy/>
                <div className="container">
                    <button className="d-block w-100 btn btn-primary mb-2" onClick={() => handleUnderstoodPolicy()}>I understand</button>
                </div>
            </div>
        </Dialog>
    );
}
 
export default CommentPolicyDialog;