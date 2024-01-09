import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import CreateNewJob from "../pages/Job/CreateNewJob";
import Job from "../pages/Job/Job";
import Profile from "../pages/Profile/Profile";
import Worker from "../pages/Worker/Worker";
import WorkerInfo from "../pages/Worker/WorkerInfo";
import CvList from "../pages/CV_List/CvList";
import CreateCV from "../pages/CreateCV/CreateCv";
import JobInfo from "../pages/Job/JobInfo";
import MyJob from "../pages/Job/MyJob";

function AppRoutes() {
  const userData = JSON.parse(localStorage.getItem("userData"));

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
  const ProtectedJobInfo = () => {
    return localStorage.getItem("userData") !== null ? (
      <JobInfo />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedMyJob = () => {
    return localStorage.getItem("userData") !== null ? (
      <MyJob />
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
  const ProtectedWorkerInfo = () => {
    return localStorage.getItem("userData") !== null ? (
      <WorkerInfo />
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
  const ProtectedCreateJob = () => {
    return localStorage.getItem("userData") !== null ? (
      <CreateNewJob />
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
      <Route path="/home" element={<ProtectedHome />} />
      <Route path="/job" element={<ProtectedJob />} />
      <Route path="/job/:id" element={<ProtectedJobInfo />} />
      {/* {userData.role === "Homeowner" ? ( */}
      <Route path="/create-job" element={<ProtectedCreateJob />} />
      <Route path="/worker" element={<ProtectedWorker />} />
      <Route path="/worker/:id" element={<ProtectedWorkerInfo />} />
      <Route path="/profile" element={<ProtectedProfile />} />
      {/* {userData.role === "Homeowner" ? ( */}
      <Route path="/my-job" element={<ProtectedMyJob />} />
      <Route path="/cvlist" element={<ProtectedCvList />} />
      <Route path="/createCv" element={<ProtectedCreateCv />} />
    </Routes>
  );
}

export default AppRoutes;
