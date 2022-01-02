import { Navigate} from "react-router-dom";
import { useAuthContext } from "../hooks/auth/useAuthContext";

const UnPrivateRoute = ({children}) => {
    const { user } = useAuthContext()
    return !user ? children: <Navigate to="/auth" /> 
}
 
export default UnPrivateRoute;