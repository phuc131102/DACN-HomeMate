import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import EnterPassword from "../pages/Login/EnterPassword";
import CreateNewJob from "../pages/Job/CreateNewJob";
import Job from "../pages/Job/Job";
import Profile from "../pages/Profile/Profile";
import Worker from "../pages/Worker/Worker";
import WorkerInfo from "../pages/Worker/WorkerInfo";
import CvList from "../pages/CV_List/CvList";
import CreateCV from "../pages/CreateCV/CreateCv";
import JobInfo from "../pages/Job/JobInfo";
import MyJob from "../pages/Job/MyJob";
import Admin from "../pages/User/Admin";
import UserInfo from "../pages/User/UserInfo";
import AddUser from "../pages/User/AddUser";
import UpdateCV from "../pages/UpdateCV/UpdateCV";

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
  const ProtectedJobInfo = () => {
    return localStorage.getItem("userData") !== null ? (
      <JobInfo />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedMyJob = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return localStorage.getItem("userData") !== null &&
      userData.role === "Homeowner" ? (
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
    const userData = JSON.parse(localStorage.getItem("userData"));
    return localStorage.getItem("userData") !== null &&
      userData.role === "Homeowner" ? (
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
  const ProtectedUpdateCv = () => {
    return localStorage.getItem("userData") !== null ? (
      <UpdateCV />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedUserList = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return localStorage.getItem("userData") !== null &&
      userData.role === "Admin" ? (
      <Admin />
    ) : (
      <Navigate to="/" replace />
    );
  };
  const ProtectedUserInfo = () => {
    return localStorage.getItem("userData") !== null ? (
      <UserInfo />
    ) : (
      <Navigate to="/" replace />
    );
  };

  const ProtectedAddUser = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    return localStorage.getItem("userData") !== null &&
      userData.role === "Admin" ? (
      <AddUser />
    ) : (
      <Navigate to="/" replace />
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/resetpwdstep1" element={<EnterPassword />} />
      <Route path="/home" element={<ProtectedHome />} />
      <Route path="/job" element={<ProtectedJob />} />
      <Route path="/job/:id" element={<ProtectedJobInfo />} />

      <Route path="/userlist" element={<ProtectedUserList />} />
      <Route path="/add-user" element={<ProtectedAddUser />} />
      <Route path="/user/:id" element={<ProtectedUserInfo />} />

      <Route path="/create-job" element={<ProtectedCreateJob />} />

      <Route path="/worker" element={<ProtectedWorker />} />
      <Route path="/worker/:id" element={<ProtectedWorkerInfo />} />
      <Route path="/profile/:id" element={<ProtectedProfile />} />

      <Route path="/my-job" element={<ProtectedMyJob />} />

      <Route path="/cvlist" element={<ProtectedCvList />} />
      <Route path="/createCv" element={<ProtectedCreateCv />} />
      <Route path="/UpdateCv/:id" element={<ProtectedUpdateCv />} />
    </Routes>
  );
}

export default AppRoutes;
