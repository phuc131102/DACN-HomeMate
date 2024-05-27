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

function MessageContainer(prop) {
  return (
    <Box
      sx={{
        // height: "90%",
        marginTop: "30px",
        backgroundColor: "rgba(17,25,40,0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.125)",
        backdropFilter: "blur(19px) saturate(180%)",
      }}
    >
      <Box>
        <Grid container>
          <Grid item xs={3}>
            <List userInfo={prop.userInfo}/>
          </Grid>
          <Grid item xs={6}>
            <Message />
          </Grid>
          <Grid item xs={3}>
            <Detail />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default MessageContainer;
