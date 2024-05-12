import React from "react";
import { Typography, Box } from "@mui/material";

function UserInfor(prop) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h5">Role: {prop.userInfo.role}</Typography>
      </Box>
      {prop.userInfo.block ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Typography color="error" variant="h5">
            <b>Status: BLOCKED</b>
          </Typography>
        </Box>
      ) : null}
    </>
  );
}

export default UserInfor;
