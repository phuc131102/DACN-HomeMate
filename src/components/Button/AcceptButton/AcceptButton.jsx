import React from "react";
import { Button } from "@mui/material";
import { accept_apply } from "../../../services/jobAPI";

export default function AcceptButton({ owner_id, worker_id, job_id }) {
  const handleAccept = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      homeownerId: owner_id,
      workerId: worker_id,
      jobId: job_id,
    };

    try {
      const response = await accept_apply(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Accept apply successfully:", response);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Failed:", error);
    }
  };

  return (
    <Button
      variant="contained"
      color="success"
      sx={{
        width: "100%",

        borderRadius: "15px",
      }}
      onClick={handleAccept}
    >
      Accept
    </Button>
  );
}
