import { useState } from "react"
import BlogList from "./blogs/BlogList";
import BlogSearch from "./blogs/BlogSearch";
import { useParams } from "react-router-dom"
import useRead from "../hooks/firestore/useRead";
import { useTheme } from "../hooks/useTheme";
import { Link } from "react-router-dom";

const Home = ({destroyable}) => {
   const order = { orderBy: "date", direction: "desc" }
   const {error, isPending, docs: allBlogs} = useRead("blogs", { order }, true)
   const { theme } = useTheme()
   const { pageData } = useParams() 
   const pageNumber = pageData ? parseInt(pageData): 1
   const [search, setSearch] = useState("")
    
    const handleSearch = e => {
        setSearch(e.target.value)
    }

   return ( 
        <div className="home container">
            
            {pageNumber===1 && (
                <form className="d-flex justify-content-center">
                    <input className={`my-3 text-center search-bar search-bar-${theme}`} id="search-blogs" type="text" onChange={ handleSearch } placeholder="Search all blogs" autoComplete="off"/>
                </form>
            )}

            <div className="blogs-container text-center">
                {error && <div className="container mt-3">{ error }</div>}
                {isPending && <div className="container">Loading...</div>}
                {!isPending && 
                (search ? 
                <BlogSearch allBlogs={ allBlogs } search={ search } destroyable={ destroyable }/>: 
                <BlogList blogs={ allBlogs.slice((pageNumber-1)*5, pageNumber*5) } allBlogs={ allBlogs } pageNumber={ pageNumber } destroyable={ destroyable }/>)}
            </div>
            {destroyable && (
                <div className="container-fluid text-center mt-3">
                    <hr />
                    <Link to="/auth" className="auth-nav-link">Auth Navigation</Link>
                </div>
            )}

        </div>
    );
}
 
export default Home;