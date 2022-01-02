import Home from './components/Home';
import Navbar from './components/Navbar';
import { Route, Routes } from "react-router-dom"
import CreateBlog from './components/blogs/CreateBlog';
import NotFound from "./components/NotFound";
import Login from './components/auth/Login';
import { useTheme } from "./hooks/useTheme"
import Logout from './components/auth/Logout';
import { useAuthContext } from './hooks/auth/useAuthContext';
import PrivateRoute from './protectors/PrivateRoute';
import UnPrivateRoute from './protectors/UnprivateRoute';
import AuthNavigator from './components/auth/AuthNavigator';
import CommentPolicy from './components/comments/CommentPolicy';
import BlogPage from './components/blogs/BlogPage';
import UpdateBlog from './components/blogs/UpdateBlog';

function App() {
  const { theme } = useTheme()
  const { authIsReady } = useAuthContext()

  return (
      <div className={`app app-${theme}`}>
        {authIsReady && <Navbar />}
        {authIsReady && 
        (
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home destroyable={false}/>}></Route>
            <Route exact path="/posts" element={<Home destroyable={false}/>}></Route>
            <Route path="/posts/:pageData" element={<Home destroyable={false}/>}></Route>
            <Route exact path="/auth" element={<AuthNavigator/>}></Route>
            <Route exact path="/auth/create" element={<PrivateRoute redirect={"/auth/login"}><CreateBlog /></PrivateRoute>}></Route>
            <Route path="/auth/create/:title" element={<PrivateRoute redirect={"/auth/login"}><UpdateBlog /></PrivateRoute>}></Route>
            <Route exact path="/auth/destroy" element={<PrivateRoute redirect={"/auth/login"}><Home destroyable={true}/></PrivateRoute>}></Route>
            <Route path="/auth/destroy/:pageData" element={<Home destroyable={true}/>}></Route>
            <Route path="/blogs/:title" element={<BlogPage/>}></Route>
            <Route path="/auth/login" element={<UnPrivateRoute><Login/></UnPrivateRoute>}></Route>
            <Route path="/auth/logout" element={<PrivateRoute redirect={"/auth"}><Logout/></PrivateRoute>}></Route>
            <Route path="/policy" element={<CommentPolicy/>}></Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </div>
        )
        }
      </div>

  );
}

export default App;
