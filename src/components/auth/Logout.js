import { Link } from "react-router-dom";
import useLogout from "../../hooks/auth/useLogout";

const Logout = () => {
    const {error, isPending, logout} = useLogout()

    return (
        <div className="container-fluid text-center mt-5">
            {!isPending ? 
            <button className="btn btn-secondary" onClick={logout}>Log out</button>:
            <button className="btn btn-secondary" disabled>Loading...</button>
            }
            {error && <p className="text-danger">{error}</p>}
            <div className="container-fluid text-center mt-5">
                <Link to="/auth" className="auth-nav-link">Auth Navigation</Link>
            </div>
        </div>
        
        
    );
}
 
export default Logout;