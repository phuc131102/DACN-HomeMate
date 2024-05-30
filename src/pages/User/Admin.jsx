import React, { useState, useEffect } from "react";
import UserListPage from "./UserList";
import { Box } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import useUsers from "../../utils/userUtils/userUtils";
import Loading from "../../components/Loading/Loading";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dashboard from "./Child/Dashboard";
import useJobs from "../../utils/jobUtils/jobUtils";
import BlackListPage from "./BlackList";
import JobList from "./JobList";
import ReportList from "./ReportList";

function Admin() {
  const { users, loading } = useUsers();
  const { jobs, loadingJob } = useJobs();
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const navigate = useNavigate();

  const { tabValue } = useParams();
  const [value, setValue] = useState(tabValue || "1");

  useEffect(() => {
    if (tabValue) {
      setValue(tabValue);
    }
  }, [tabValue]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(`/admin/${newValue}`);
  };
  if (loading && loadingJob) {
    return <Loading />;
  }
  return (
    <Box sx={{ width: "90%", margin: "auto", marginTop: "100px" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              variant="scrollable"
              allowScrollButtonsMobile
            >
              <Tab label="Dashboard" value="1" />
              <Tab label="Users" value="2" />
              <Tab label="Black List" value="3" />
              <Tab label="Report" value="4" />
              <Tab label="Jobs" value="5" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Dashboard users={users} jobs={jobs} />
          </TabPanel>
          <TabPanel value="2">
            <UserListPage users={users} userData={userData} />
          </TabPanel>
          <TabPanel value="3">
            <BlackListPage users={users} userData={userData} />
          </TabPanel>
          <TabPanel value="4">
            <ReportList jobs={jobs} userData={userData} />
          </TabPanel>
          <TabPanel value="5">
            <JobList jobs={jobs} userData={userData} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Admin;
