import { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import {
} from '@mui/material';
const NoteField = (props) => {
    const { note } = props
    const noteRef = useRef()
    useEffect(() => {
        noteRef.current.innerHTML = note
    }, [note])
    // console.log("noteRef: ", noteRef)
    return (
        <Box ref={noteRef} sx={{ overflowY: "scroll", maxHeight: "500px" }} />
    )
}

export default NoteField