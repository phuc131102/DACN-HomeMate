import React from "react";
import { useParams } from "react-router-dom";
import CvUpdateState from "./Child/CvUpdateState";
function UpdateCV(){
    const {id} = useParams()
    return(<>
        <CvUpdateState id={id}/>
    </>)
}

export default UpdateCV;