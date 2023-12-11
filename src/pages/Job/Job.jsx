import React from "react";
import { Navigate } from "react-router-dom";

function Job({ user }) {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <div>Job</div>;
}

export default Job;
