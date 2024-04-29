import React from "react";
import { Button } from "@mui/material";

export default function AcceptButton() {
  return (
    <Button
      variant="contained"
      color="success"
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
      Accept
    </Button>
  );
}
