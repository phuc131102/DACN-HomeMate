import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Button, Typography, Box } from "@mui/material";

function Avt(prop) {
  return (
    <Grid item xs={12}>
      {prop.userInfo.avatar === "" ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            alt="Kisspng computer"
            src={prop.avtEmpty}
            style={{
              width: "55%",
              height: "55%",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              border: "5px solid black",
            }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            alt={prop.userInfo.avatar}
            src={prop.userInfo.avatar}
            style={{
              width: "55%",
              height: "55%",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
              border: "5px solid black",
            }}
          />
        </Box>
      )}
    </Grid>
  );
}

export default Avt;
