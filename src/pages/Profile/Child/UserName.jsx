import React from "react";
import { Grid, Typography, Box } from "@mui/material";

function UserName(prop) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h3">
          <b>{prop.userInfo.name}</b>
        </Typography>
      </Box>
    </>
  );
}

export default UserName;
