import { Navigate} from "react-router-dom";
import { useAuthContext } from "../hooks/auth/useAuthContext";

const PrivateRoute = ({children, redirect}) => {
    const { user } = useAuthContext()
    return user ? children: <Navigate to={redirect} /> 
}
 
export default PrivateRoute;