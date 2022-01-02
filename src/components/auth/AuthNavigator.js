import { Link } from "react-router-dom"
import { useTheme } from "../../hooks/useTheme";
import "../css/AuthNavigator.css"

const AuthNavigator = () => {
    const { theme } = useTheme()

    return (
        <div className="auth-navigate container h5">
            <div className="row text-center mt-5">
                <Link className={`col-6 border p-5 write-actions write-actions-${theme} create-action-${theme}`} to="/auth/create">
                    Create
                </Link>
                <Link className={`col-6 border p-5 log-actions log-actions-${theme}`} to="/auth/login">
                    Login
                </Link>
            </div>
            <div className="row text-center">
                <Link className={`col-6 border p-5 write-actions write-actions-${theme} destroy-action-${theme}`} to="/auth/destroy">
                    Destroy
                </Link>
                <Link className={`col-6 border p-5 log-actions log-actions-${theme}`} to="/auth/logout">
                    Logout
                </Link>
            </div>
        </div>
    );
}
 
export default AuthNavigator;