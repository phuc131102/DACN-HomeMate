import React, { useState, useEffect } from "react";
import UserListPage from "./UserList";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Pagination,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUsers from "../../utils/userUtils/userUtils";
import Loading from "../../components/Loading/Loading";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Dashboard from "./Child/Dashboard";

function Admin() {
  const { users, loading } = useUsers();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const navigate = useNavigate();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Box sx={{ width: "90%", margin: "auto", marginTop: "100px" }}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Dashboard" value="1" />
              <Tab label="Users" value="2" />
              <Tab label="Black List" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Dashboard />
          </TabPanel>
          <TabPanel value="2">
            <UserListPage users={users} userData={userData} />
          </TabPanel>
          <TabPanel value="3">Black List</TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
}

export default Admin;
