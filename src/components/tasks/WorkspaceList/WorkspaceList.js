import { useState } from "react";
import { Link } from "react-router-dom"
import { useAuthContext } from "../../../hooks/auth/useAuthContext";
import useRead from "../../../hooks/firestore/useRead";
import useWrite from "../../../hooks/firestore/useWrite"
import { projectFirestore } from "../../../firebase/config"; 
import "./WorkspaceList.css"
import { useTheme } from "../../../hooks/useTheme";

const WorkspaceList = () => {
    const { theme } = useTheme();
    const { user } = useAuthContext();
    const test = { field: "user_id", operator: "==", value: user.uid };
    const order = { orderBy: "date", direction: "desc" };
    const { error: readError, isPending: isReadPending , docs: workspaces } = useRead("workspaces", { test, order }, true);
    const [name, setName] = useState("");
    const [deletable, setDeletable] = useState(false);
    const { addDocument, deleteDocument } = useWrite("workspaces");


    const handleChange = e => {
        setName(e.target.value);
    };


    const handleNewWorkspace = async (e) => {
        e.preventDefault();
        await addDocument({
                name, 
                user_id: user.uid
            });
        e.target.name.value = "";
       

    }

    const handleDelete = async (id) => {
        await deleteDocument(id);
        const ref = projectFirestore.collection("task_lists").where("workspaceId", "==", id)
        await ref.get().then(snapshot => {
            if (!snapshot.empty) {
                snapshot.docs.forEach(doc => {
                    doc.ref.delete();
                })
            }
        });
    }


    return ( 
        <div className={`workspace-list workspace-list-${theme} m-5 text-center`}>
            <div className="workspaces border px-5 pb-3 d-inline-block">
            <h3 className="pt-5 px-5 d-inline-block"> Your Workspaces:</h3>
                {/* <p className="text-danger">{readError && readError}</p> */}
                <p>{isReadPending && "Loading..."}</p>
                {!isReadPending && 
                (!!workspaces.length ? 
                    <div>
                        <ul className="px-5">
                            {
                            workspaces.map((workspace, index) => (
                                <li className="my-1" key={index}>
                                    {!deletable ? (
                                        <Link 
                                        className="workspace-link" 
                                        to={`/tasks/workspace/${workspace.id}`}>
                                            {workspace.name}                                           
                                        </Link>
                                    )
                                    : (
                                    <div className="deletable-link" >
                                        <i className="bi bi-trash" onClick={(e) => handleDelete(workspace.id)}></i>
                                        {workspace.name}
                
                                    </div>) 
                                    } 
                                       
                                </li>
                                )
                            )
                            }
                        </ul>
                        <i className={`bi bi-pencil-square ${deletable && "pencil-delete"}`} onClick={() => {setDeletable(!deletable)}}></i>
                    </div>
                
            :
                "You don't have any workspaces"
                )}
            
            </div>
            <br />
            <form onSubmit={handleNewWorkspace} className="my-3 border p-5 d-inline-block">
                <h5>Start a new workspace:</h5>
                <input type="text" name="name" onChange={handleChange} autoComplete="off" placeholder="name" required/>
                <button type="submit" className="btn btn-secondary m-3">Create</button>
            </form>
        </div>
    );
};
 
export default WorkspaceList;