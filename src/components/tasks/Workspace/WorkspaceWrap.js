import { useParams } from "react-router-dom"
import useRead from "../../../hooks/firestore/useRead";
import Workspace from "./Workspace"



const WorkspaceWrap = () => {
    const { id } = useParams();
    const test = { field: "workspaceId", operator: "==", value: id };
    const { docs, isPending } = useRead("task_lists", { test });

    return (
        <div>
            {isPending && "Loading..."}
            {!isPending && !!docs.length && <Workspace workspaceId={id} tasks={docs[0].tasks} listId={docs[0].id}/>}
            {!isPending && !docs.length && <Workspace workspaceId={id} tasks={[]} listId={undefined}/>}
        </div>
    );
}
 
export default WorkspaceWrap;
