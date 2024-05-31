import React from "react";
import { Typography, Box } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

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
      {prop.userInfo.status === "Rejected" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ReportIcon color="error" />
          <Typography variant="h6" color="error">
            <b>ID Information change required</b>
          </Typography>
        </Box>
      )}
      {prop.userInfo.status === "Pending" && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <ReportIcon color="error" />
          <Typography variant="h6" color="error">
            <b>ID Information verification is pending...</b>
          </Typography>
        </Box>
      )}
      {prop.userInfo.block ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            marginTop: "5%",
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
