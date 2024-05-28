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
} from "@mui/material";
import Message from "./Message";
import List from "./List/List";
import Detail from "./Detail";
import {useChatStore} from "../../../lib/chatStore"
function MessageContainer(prop) {
  const { chatId} = useChatStore()
  return (
    <Box
      sx={{
        // height: "90%",
        marginTop: "30px",
        backgroundColor: "#A4ADBC",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.125)",
        backdropFilter: "blur(19px) saturate(180%)",
      }}
    >
      <Box>
        <Grid container>
          <Grid item xs={chatId?4:12}>
            <List userInfo={prop.userInfo}/>
          </Grid>
          <Grid item xs={8}>
            {chatId&&<Message userData={prop.userData} />}
          </Grid>
          {/* <Grid item xs={3}>
          {chatId&&<Detail />}
          </Grid> */}
        </Grid>
      </Box>
    </Box>
  );
}

export default MessageContainer;
