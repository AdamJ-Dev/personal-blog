import { Link } from "react-router-dom";
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import { useTheme } from "../../../hooks/useTheme";
import WorkspaceList from "../WorkspaceList/WorkspaceList";
import "./TaskManager.css"

const TaskManager = () => {
   const { theme } = useTheme();
   const { user } = useAuthContext()

    return ( 
    <div className={`m-5 task-manager-${theme}`}>
      { user ? <WorkspaceList/>: 
      <div className="text-center"> 
        <div className="d-inline-block border p-5 m-auto">
          <ul className="not-reg-msg">
            <li>&nbsp; You are not a registered user;</li>
            <li>&nbsp;&nbsp;&nbsp;&nbsp; But you can use a default workspace by clicking below;</li>
            <li>&nbsp; But your data will be lost when you leave the page.</li>
          </ul>
          <Link to="/tasks/workspace"><button className="btn btn-secondary mt-1">New Workspace</button></Link>
        </div>
        </div>
      }  
    </div> 
    );
}
 
export default TaskManager;