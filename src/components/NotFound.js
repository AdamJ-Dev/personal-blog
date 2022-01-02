import { Link } from "react-router-dom"
import { useTheme } from "../hooks/useTheme";

const NotFound = () => {
    const { theme } = useTheme()

    return (  
        <div className={`container text-center not-found-${theme} mt-5`}>
            <h4>Despite appearances, this page does not exist.</h4>
            <br />
            <p>Head on <Link to="/">home</Link>.</p>
        </div>
    );
}
 
export default NotFound;