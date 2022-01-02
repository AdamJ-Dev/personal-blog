import { useState, useEffect } from "react"
import { projectFirestore } from "../../firebase/config"
import { cleanDateNoTime } from "../../helpers/cleanDate"

const useRead = (collection, {test, order}, realTime=false) => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [docs, setDocs] = useState([])
    const dependencyArray = [collection]

    const handleSnapshot = snapshot => {
        if (snapshot.empty) {
            setError(`No ${collection} were found`)
            setIsPending(false)
        } else {
            let results = []
            snapshot.docs.forEach(doc => {
                const { date } = doc.data()
                results.push({id: doc.id, ...doc.data(), date: cleanDateNoTime(date.toDate())})
            })
            setDocs(results)
            setIsPending(false)
        }
    }

    const handleError = err => {
        setError(err.message);
        setIsPending(false);
    }

    useEffect(() => {
        setIsPending(true)
        
        let ref = projectFirestore.collection(collection)

        if (test) {
            const { field, operator, value} = test
            ref = ref.where(field, operator, value)
            dependencyArray.push(field, operator, value)
        } if (order) {
            const { orderBy, direction } = order
            ref = ref.orderBy(orderBy, direction)
            dependencyArray.push(orderBy, direction)
        } 
        if (realTime) {
            const unsub = ref.onSnapshot(handleSnapshot, handleError)
            return () => unsub()
        } else {
            ref.get().then(handleSnapshot).catch(handleError)
        }

    }, [...dependencyArray])
    
    
    return { error, isPending, docs};
}
 
export default useRead;