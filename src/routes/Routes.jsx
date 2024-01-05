import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Job from "../pages/Job/Job";
import Profile from "../pages/Profile/Profile";
import Worker from "../pages/Worker/Worker";
import CvList from "../pages/CV_List/CvList";
import CreateCV from "../pages/CreateCV/CreateCv";

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

  const ProtectedCreateCv = () => {
    return localStorage.getItem("userData") !== null ? (
      <CreateCV />
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/cvlist" element={<ProtectedCvList />} />
      <Route path="/home" element={<ProtectedHome />} />
      <Route path="/job" element={<ProtectedJob />} />
      <Route path="/worker" element={<ProtectedWorker />} />
      <Route path="/profile" element={<ProtectedProfile />} />
      <Route path="/createCv" element={<ProtectedCreateCv />} />
    </Routes>
  );
}

export default AppRoutes;
