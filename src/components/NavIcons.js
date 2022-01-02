import { useTheme } from "../hooks/useTheme";

const NavIcons = () => {
    const {theme, changeTheme}= useTheme()

    return ( 
    <div className="mt-2">
        {theme==="light" ? 
        <div className="container">
            <span className="nav-icon-wrap">
                <a href="mailto:unfoolable.queries@gmail.com">
                    <i className="bi bi-envelope me-2"></i>
                </a>
            </span>
            <span className="nav-icon-wrap" onClick={changeTheme}>
                <i className="bi bi-moon"></i>
            </span>
        </div>
        :
        <div className="container">
            <span className="nav-icon-wrap">
                <a href="mailto:unfoolable.queries@gmail.com">
                    <i className="bi bi-envelope-fill me-2"></i>
                </a>
            </span>
            <span className="nav-icon-wrap" onClick={changeTheme}>
                <i className="bi bi-moon-fill" ></i>
            </span>
        </div>
        }
    </div>);
    }
 
export default NavIcons;