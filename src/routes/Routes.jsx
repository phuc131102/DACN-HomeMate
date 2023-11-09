import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Job from "../pages/Job/Job";

function AppRoutes({ setUser, user }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/job" element={<Job user={user} />} />
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default AppRoutes;
