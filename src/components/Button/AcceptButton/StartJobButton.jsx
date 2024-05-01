import React from "react";
import { Button } from "@mui/material";
import { start_job } from "../../../services/jobAPI";

export default function StartJobButton({ owner_id, job_id }) {
  const handleStartJob = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      homeownerId: owner_id,
      jobId: job_id,
    };

    try {
      const response = await start_job(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Start job successfully:", response);
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
        width: "15%",
        borderRadius: "15px",
        marginBottom: "2%",
      }}
      onClick={handleStartJob}
    >
      Start Job
    </Button>
  );
}
