import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  duration,
} from "@mui/material";
import myccImage from "./mycc.jpg";
import "./UserInfor.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import EditNoteIcon from '@mui/icons-material/EditNote';


function UserInfor(prop) {
  
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box className="user" sx={{display:"flex", alignItems:"center", gap:"20px"}}>
        <Box>
          <img src={prop.userInfo.avatar} alt="avt" className="avtimg" />
        </Box>
        <Typography sx={{color:"white"}}>{prop.userInfo.name}</Typography>
      </Box>
      {/* <Box className="icons" sx={{display:"flex", gap:"20px"}}>
        <Box className="MoreIcon">
          {" "}
          <MoreHorizIcon fontSize="small" sx={{color:"white"}}/>
        </Box>
        <Box className="EditIcon">
          {" "}
          <EditNoteIcon fontSize="small" sx={{color:"white"}}/>
        </Box>
        <img src="" alt="" />
      </Box> */}
    </Box>
  );
}

export default UserInfor;
