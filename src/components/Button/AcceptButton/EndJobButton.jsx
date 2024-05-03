import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { end_job } from "../../../services/jobAPI";

export default function EndJobButton({ owner_id, job_id }) {
  const navigate = useNavigate();

  const handleEndJob = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      homeownerId: owner_id,
      jobId: job_id,
    };

    try {
      const response = await end_job(updatedFormData);
      if (response) {
        navigate("/job");
        console.log("End job successfully:", response);
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
      sx={{
        fontWeight: 600,
        borderRadius: 15,
        maxWidth: "500px",
        marginRight: "15px",
        minWidth: "150px",
        padding: "5px 10px",
        fontSize: "1.2rem",
      }}
      onClick={handleEndJob}
    >
      End Job
    </Button>
  );
}
