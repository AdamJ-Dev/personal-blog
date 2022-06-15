const Board = ({children, boardId}) => {
    
    let title = "";
    if (boardId === 1) title = "To Do" 
    if (boardId === 2) title = "Doing"
    if (boardId === 3) title = "Done";
      
    return (
      <div className="my-3 mx-5 text-center">
        <h2>{title}</h2>
         <div className="d-inline-block border">
             { children }
         </div>
      </div>
             
     );
}
 
export default Board;