import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Job from "../pages/Job/Job";
import Profile from "../pages/Profile/Profile";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/job" element={<Job />} />
      <Route path="/profile" element={<Profile />} />

      {/* <Route path="/topbar" element={<TopBar />} /> */}
      {/* <Route path="*" element={<NoMatch />} /> */}
    </Routes>
  );
}

export default AppRoutes;
