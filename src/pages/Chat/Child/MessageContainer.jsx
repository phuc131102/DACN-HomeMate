import React, { useEffect } from "react";
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
import { useChatStore } from "../../../lib/chatStore";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function MessageContainer(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  // console.log(prop.userData)
  const { chatId, ChangeCall } = useChatStore();
  useEffect(()=>{
    ChangeCall(prop.userInfo)
  },[])
  return (
    <Box
      sx={{
        // height: "90%",
        marginTop: "30px",
        backgroundColor: "#A4ADBC",
        borderRadius: isMd?"12px":"",
        border: "1px solid rgba(255,255,255,0.125)",
        backdropFilter: "blur(19px) saturate(180%)",
      }}
    >
      <Box>
        {isMd ? (
          <Grid container>
            <Grid item xs={chatId ? 4 : 12}>
              <List userInfo={prop.userInfo} />
            </Grid>
            <Grid item xs={8}>
              {chatId && <Message userData={prop.userData} />}
            </Grid>
            {/* <Grid item xs={3}>
          {chatId&&<Detail />}
          </Grid> */}
          </Grid>
        ) : (
          <Grid container>
            {!chatId && <Grid item xs={12}>
              <List userInfo={prop.userInfo} />
            </Grid>}
            {chatId && <Grid item xs={12}>
              {chatId && <Message userData={prop.userData} userInfo={prop.userInfo}/>}
            </Grid>}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default MessageContainer;
