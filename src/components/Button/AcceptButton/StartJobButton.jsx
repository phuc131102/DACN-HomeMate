import React from "react";
import { Button, Typography, Box } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2%",
      }}
    >
      <Button
        variant="contained"
        color="success"
        sx={{
          width: "25%",
          borderRadius: "15px",
        }}
        onClick={handleStartJob}
      >
        Start Job
      </Button>
      <Typography
        sx={{
          color: "red",
        }}
      >
        *This action will start the job without reaching required number of
        workers and before the date of work.
      </Typography>
    </Box>
  );
}
