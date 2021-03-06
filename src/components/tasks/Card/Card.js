import { editCardsByCard, removeCard } from "../../../helpers/handleCards";

const Card = ({children, id, slot, boardId, message, draggable, cards, setCards}) => {
    
    const handleDragStart = e => {
        e.dataTransfer.setData("card_id", id)
        e.dataTransfer.setData("board_id", boardId)
        e.dataTransfer.setData("slot", slot)

        setTimeout(() => {
           document.getElementById(id).style.display = "none";
        }, 0)
        }
        
    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDragEnd = e => {
        e.preventDefault();
        document.getElementById(id).style.display = "block";
        e.stopPropagation();
    }
    
    const handleDrop = e => {
    
        const getData = (type) => {
            return e.dataTransfer.getData(type);
        };
    
        const cardId = getData("card_id");
        const cardBoardId = parseInt(getData("board_id"));
        const cardSlot = parseInt(getData("slot"));
    
    
        const isDiffBoard = boardId !== cardBoardId;
        const isDiffSlot = slot !== cardSlot;
        
        let edits = {};
        if (isDiffBoard) edits["boardId"] = boardId;
        if (isDiffSlot) edits["slot"] = slot;
    
        if (isDiffBoard || isDiffSlot) {
            const editedCards = editCardsByCard(cards, cardId, edits);
            setCards(editedCards);
        };
    
    };
    
    const handleDelete = async e => {
        setCards(removeCard({id, boardId, slot}, cards));
    };

    return ( 
        <div>
            <div id={`${id}`}>
            <div 
            id={id}
            slot={slot}
            className={`d-inline-block ${draggable ? "p-5": "pb-3"}`}
            onDragStart={handleDragStart}
            onDragOver = {handleDragOver}
            onDragEnd = {handleDragEnd}
            onDrop = {handleDrop}
            onDragEnter = {handleDragEnter}
            onDragLeave = {handleDragLeave}
            draggable={draggable}>
                {message}
                {children}
            </div>
            {draggable && <i id={`delete-card-${id}`} className="bi bi-x d-inline" onClick={handleDelete}></i>}
        </div>
        </div>
        
    );
}
 
export default Card;