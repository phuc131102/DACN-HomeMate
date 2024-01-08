import {Paper } from "@mui/material";

const BigCard = (props) => {
    return (
        <Paper sx={{
            boxShadow: 10,
            borderRadius: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            width: "100%"
        }}>
            {props.children}
        </Paper>
    )
}


export default BigCard