import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../../firebase/config";
import dotenv from "dotenv"

dotenv.config()

let initialState = {
    document: null,
    isPending: false,
    success: false,
    error: null
}

const writeReducer = (state, action) => {
    switch(action.type) {
        case "IS_PENDING":
            return { document: null, isPending: true, success: false, error: null}
        case "ADDED_DOCUMENT":
            console.log("the document is added to state")
            return { document: action.payload, isPending: false, success: true, error: null }
        case "UPDATED_DOCUMENT":
            return { document: action.payload, isPending: false, success: true, error: null}
        case "DELETED_DOCUMENT":
            return { document: null, isPending: false, success: true, error: null }
        case "ERROR":
            return {document: null, isPending: false, success: false, error: action.payload}
        default: 
            return state
    }   
}


const useWrite = (collection) => {
    const [response, dispatch] = useReducer(writeReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)
    const [request, setRequest] = useState(null)

    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCancelled = action => {
        if (!isCancelled) {
            console.log("Dispatching " + action.type)
            dispatch(action)
            return
        }
        console.log("failed dispatch")
        
    }

    const addDocument = async (doc) => {
            dispatch({ type: "IS_PENDING"})
            try {
                const date = timestamp.fromDate(new Date())
                const addedDocument = await ref.add({...doc, date })
                console.log("about to dispatch");
                setRequest(`create-${collection}`)
                dispatchIfNotCancelled({type: "ADDED_DOCUMENT", payload: addedDocument})
                console.log(response)
            } catch (err) {
                dispatchIfNotCancelled({ type: "ERROR", payload: err.message})
            }
    }

    const updateDocument = async (docDetails) => {
        const { id, updates} = docDetails
        dispatch({type: "IS_PENDING"})
        try {
            const updatedDocument = await ref.doc(id).update(updates)
            dispatchIfNotCancelled({ type: "UPDATED_DOCUMENT", payload: updatedDocument })
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message })
        }
    }

    const deleteDocument = async (id) => {
        dispatch({ type: "IS_PENDING"})
        try {
            await ref.doc(id).delete()
            dispatchIfNotCancelled({type: "DELETED_DOCUMENT"})
        } catch (err) {
            dispatchIfNotCancelled({ type: "ERROR", payload: err.message})
        }
    }

    const requirePasscode = async (docDetails, passcode, writeFn) => {
        if (passcode === process.env.REACT_APP_WRITE_PASSCODE) {
            await writeFn(docDetails)
        } else {
            dispatch({ type: "ERROR", payload: "Passcode incorrect"})
        }
    }

    const addDocumentWithPasscode = async (doc, passcode) => {
        await requirePasscode(doc, passcode, addDocument)
    }  

    const updateDocumentWithPasscode = async (id, updates, passcode) => {
        await requirePasscode({id, updates}, passcode, updateDocument)
    }

    const deleteDocumentWithPasscode = async (id, passcode) => {
        await requirePasscode(id, passcode, deleteDocument)
    }

  
    
    useEffect(() => {
        if (response.success && request === "create-blogs") window.location.assign("/")
        return () => {setIsCancelled(true)}
    }, [])

    return { addDocument, updateDocument, updateDocumentWithPasscode, addDocumentWithPasscode, deleteDocumentWithPasscode, deleteDocument, response }

}

export default useWrite