import { useState } from "react"
import { Link } from "react-router-dom"
import useLogin from "../../hooks/auth/useLogin"
import { useTheme } from "../../hooks/useTheme"
import "../css/Login.css"

const Login = () => {
    const { theme } = useTheme()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isPending } = useLogin()
    
    const handleLogin = (e) => {
        e.preventDefault()
        login(email, password)
    }

    return (  
        <div className={`credentials credentials-${theme} mt-5`}>
            <form className="credentials-form w-50 m-auto" onSubmit={handleLogin}>
                <label htmlFor="email" className="form-label">Email:</label>
                <input id="email" name="email" type="text" className="form-control mb-3" onChange={e => {setEmail(e.target.value)}} required/>
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" name="password" type="password" className="form-control mb-3" onChange={e => {setPassword(e.target.value)}} required/>
                {!isPending ?
                    <button type="submit" className="btn btn-primary">Log in</button>:
                    <button className="btn btn-primary" disabled>Loading...</button>    
                }
                {error && <p className="text-danger mt-2">{error}</p>}            
            </form>
            <div className="container-fluid text-center mt-4">
                <Link to="/auth" className="auth-nav-link">Auth Navigation</Link>
            </div>
        </div>
    );
}
 
export default Login;