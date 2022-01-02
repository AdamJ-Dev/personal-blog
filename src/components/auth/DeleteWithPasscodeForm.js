import dotenv from "dotenv"
import { useState } from "react"
import { useTheme } from "../../hooks/useTheme"
import useWrite from "../../hooks/firestore/useWrite"

dotenv.config()

const DeleteWithPasscodeForm = ({collection, document}) => {
    const { deleteDocumentWithPasscode, response } = useWrite(collection) 
    const { theme } = useTheme()
    const [passcode, setPasscode] = useState("")

    const handleDelete = async (e) => {
        e.preventDefault()
        await deleteDocumentWithPasscode(document.id, passcode)
    }

    return (                 
    <form onSubmit={handleDelete}>
        <div className="delete-box">
            <input type="password" name="passcode"  className={`delete-${theme}`} onChange={e => {setPasscode(e.target.value);}} placeholder="Enter passcode"/>
            {!response.isPending ?
                <button type="submit" className="btn btn-sm btn-danger">Delete</button>:
                <button className="btn btn-sm btn-danger">Deleting...</button>
            }
        </div>
        {response.error && <p className="text-danger mt-2">{response.error}</p>}
    </form>
 );
}
 
export default DeleteWithPasscodeForm;