import { useState } from "react";


const CreateTask = ({boardId, boardLength, cards, setCards}) => {
    const [message, setMessage] = useState("");


    const handleChange = e => {
        setMessage(e.target.value)
    };


    const handleSubmit = async  e => {
        e.preventDefault();

        const card = {
                id: cards.length + 1,
                message,
                boardId,
                slot: boardLength + 1
        };

            setCards(cards.concat([card]))
        
        e.target["new-message"].value = "";
    };
  
        return (
        <form onSubmit={handleSubmit}>
            <input 
            name="new-message"
            type="text"
            className="form-control"
            onChange={handleChange}
            placeholder="add new task" 
            autoComplete="off"
            required/>
        </form>
    );
}
 
export default CreateTask;