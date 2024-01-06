import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import CreateNewJob from "../pages/Job/CreateNewJob";
import Job from "../pages/Job/Job";
import Profile from "../pages/Profile/Profile";
import Worker from "../pages/Worker/Worker";
import CvList from "../pages/CV_List/CvList";

function AppRoutes() {
  const ProtectedHome = () => {
    return localStorage.getItem("userData") !== null ? (
      <Home />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedJob = () => {
    return localStorage.getItem("userData") !== null ? (
      <Job />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedWorker = () => {
    return localStorage.getItem("userData") !== null ? (
      <Worker />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedProfile = () => {
    return localStorage.getItem("userData") !== null ? (
      <Profile />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedCvList = () => {
    return localStorage.getItem("userData") !== null ? (
      <CvList />
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/createnewjob" element={<CreateNewJob />} />
      <Route path="/cvlist" element={<ProtectedCvList />} />
      <Route path="/home" element={<ProtectedHome />} />
      <Route path="/job" element={<ProtectedJob />} />
      <Route path="/worker" element={<ProtectedWorker />} />
      <Route path="/profile" element={<ProtectedProfile />} />
    </Routes>
  );
}

export default AppRoutes;
