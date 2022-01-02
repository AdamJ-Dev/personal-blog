import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import "./css/Navbar.css"
import NavIcons from "./NavIcons";


const Navbar = () => {
    const { theme } = useTheme()
    
    return (
                <nav className="navbar container-fluid">
                    <h2 className={`title title-${theme} mt-4`}><Link  to="/">unfoolable blog</Link></h2>                
                    <div className="nav-icons">
                        <NavIcons/>
                    </div>
                </nav>
     );
}
 
export default Navbar;