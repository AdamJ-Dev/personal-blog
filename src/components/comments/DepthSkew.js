import { useEffect } from "react";

const Skewer = () => {
    return <div className="border-end me-4" style={{minHeight: "100%"}}>
        &nbsp;
    </div>
}


const DepthSkew = ({ depth }) => {
    const skews = []
    for (let i = 0; i < depth; i++) {
        skews.push(null)
    }

    return (
        <div className="d-flex depth-skew" style={{minHeight: "100%"}}>
            {skews.map((skew, i) => <Skewer key={i}/>)}
        </div>
        );
}
 
export default DepthSkew;