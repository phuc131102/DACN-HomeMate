import React from "react";
import { Button } from "@mui/material";

export default function RejectButton() {
  return (
    <Button
      variant="contained"
      color="error"
      sx={{
        width: "100%",
        borderRadius: "15px",
      }}
      //   onClick={() => {
      //     if (editMode) {
      //       handleUpdateJob();
      //     } else {
      //       toggleEditMode();
      //     }
      //   }}
    >
      Reject
    </Button>
  );
}
