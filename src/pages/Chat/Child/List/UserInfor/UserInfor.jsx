import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import "./UserInfor.css";
function UserInfor(prop) {
  
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom:"solid 1px gray"
      }}
    >
      <Box className="user" sx={{display:"flex", alignItems:"center", gap:"20px"}}>
        <Box>
          <img src={prop.userInfo.avatar} alt="avt" className="avtimage" />
        </Box>
        <Typography variant="h5" sx={{color:"white"}}>{prop.userInfo.name}</Typography>
      </Box>
    </Box>
  );
}

export default UserInfor;
