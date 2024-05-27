import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  duration,
  Paper,
} from "@mui/material";
import UserInfor from "./UserInfor/UserInfor";
import ChatList from "./ChatList/ChatList";
import { Chat } from "@mui/icons-material";



function List(prop) {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
      }}
    >
      <UserInfor userInfo={prop.userInfo}/>
      <ChatList />
    </Box>
  );
}

export default List;
