import Board from "../Board/Board"
import Card from "../Card/Card";
import { orderCardsBySlot, getBoardsCards } from "../../../helpers/handleCards";
import CreateTask from "../CreateTask/CreateTask";
import "./Workspace.css"
import useWrite from "../../../hooks/firestore/useWrite";
import { Link } from "react-router-dom";
import { useTheme } from "../../../hooks/useTheme";
import { useState } from "react";


const Workspace = ({workspaceId, tasks, listId}) => {
  
  const { theme } = useTheme();
  const [cards, setCards] = useState(tasks);
  const [disableSave, setDisableSave] = useState(false);
  const [taskListId, setTaskListId] = useState(listId);
  const boards = {1: getBoardsCards(1, cards), 2: getBoardsCards(2, cards), 3: getBoardsCards(3, cards)};
  const { addDocument, updateDocument, response } = useWrite("task_lists");

  console.log(orderCardsBySlot(boards[1]));


  const handleSave = async e => {
      if (taskListId === undefined) {
        setDisableSave(true);
        const newList = await addDocument({
          workspaceId,
          tasks: cards
        });
      setTaskListId(newList.id);
      setDisableSave(false);
      } else {
        await updateDocument({
          id: listId,
          updates: {
            tasks: cards
          }
        }
        );
      };
  }


  return (
    <div className={`workspace workspace-${theme} my-4 mx-5`}>
      {workspaceId !== "default" && 
        <div className="save">
          <button className="btn btn-sm btn-primary save-btn" disabled={disableSave} onClick={handleSave}>
            {!response.isPending && <i className="bi bi-save"></i>}
            {response.isPending && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
          </button>
        </div>}
        <div className="d-flex task-lists">
            {
            [1, 2, 3].map((x) => {
              return (
              <Board 
              key={x} 
              id={`board-${x}`}
              boardId={x}
              className="board"
                >
                  {
                  orderCardsBySlot(
                    boards[x]
                  ).map(({id, message, boardId, slot}, index) => { 
                    return (
                    <Card 
                    id={id} 
                    message={message}
                    boardId={boardId}
                    slot={slot}
                    key={index}
                    cards={cards}
                    setCards={setCards}
                    draggable={true}
                    /> 
                  )
                  })
                  }
                  <Card 
                  id={`last-card-${x}`}
                  message={""}
                  boardId={x}  
                  slot={boards[x].length + 1}
                  cards={cards}
                  setCards={setCards}
                  draggable={false}
                  >
                    <CreateTask
                     cards={cards}
                     setCards={setCards}
                     boardId={x}
                     boardLength={boards[x].length}
                    />
                  </Card>
            </Board>)
            })
            }
      </div>
      <div className="m-5 text-center back-workspaces">
            <Link to="/tasks"><i className="bi bi-arrow-90deg-left"></i></Link> Back {workspaceId !== "default" && "to workspaces"}
      </div>
    </div>
    
  )
}
 
export default Workspace;