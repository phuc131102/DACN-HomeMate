import React from "react";
import { Button } from "@mui/material";
import { reject_apply } from "../../../services/jobAPI";

export default function RejectButton({ owner_id, worker_id, job_id, block }) {
  const handleReject = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      homeownerId: owner_id,
      workerId: worker_id,
      jobId: job_id,
    };

    try {
      const response = await reject_apply(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Reject apply successfully:", response);
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
      color="error"
      disabled={block ? true : false}
      sx={{
        width: "100%",
        borderRadius: "15px",
      }}
      onClick={handleReject}
    >
      Reject
    </Button>
  );
}
