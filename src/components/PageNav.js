import { Link } from "react-router-dom";
import "./css/PageNav.css"

const PageNav = ({numPages, page, destroyable}) => {

    const prevLink = destroyable ? `/auth/destroy/${page-1}`: `/posts/${page-1}`
    const nextLink = destroyable ? `/auth/destroy/${page+1}`: `/posts/${page+1}`

    return (  
        <div className="page-navigation mt-4">
            {numPages && page !== 1 && <Link to={prevLink}>&lt; Prev     </Link>}
            {numPages && page !== numPages && page !== 1 && <i className="bi bi-dot"></i>}
            {numPages && page !== numPages && <Link to={nextLink}>     Next &gt;</Link>}
        </div>
    );
}
 
export default PageNav;