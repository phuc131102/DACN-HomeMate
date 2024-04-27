import React, { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
  Badge,
  TextField,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { get_user_info } from "../../services/userAPI";
import { ReactTyped } from "react-typed";
import Search from "../TopBar/Search";

function TopBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = React.useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);

  const navigate = useNavigate();

  // Mock job data
  const jobData = [
    "Software Engineer",
    "Data Scientist",
    "Product Manager",
    "Graphic Designer",
    "Systems Analyst",
    "Database Administrator",
    "Web Developer",
    "UX Designer",
    "Compliance Officer",
    "Sales Representative",
    "Marketing Coordinator",
    "Human Resources Specialist",
    "Financial Analyst",
    "Operations Manager",
    "Project Coordinator",
  ];

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserInfo = async () => {
        try {
          const response = await get_user_info(userData.id);
          setUserInfo(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        }
      };
      fetchUserInfo();
    }
  }, [userData]);

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);

  useEffect(() => {
    const activeTabIndicator = document.querySelector(".active-tab-indicator");
    if (activeTab && activeTabIndicator) {
      const newLeft = document.querySelector(`.tab-${activeTab}`).offsetLeft;
      activeTabIndicator.style.left = `${newLeft}px`;
    }
  }, [activeTab]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");

    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    } else {
      setActiveTab("home");
      localStorage.setItem("activeTab", "home");
    }
    return () => {
      localStorage.removeItem("activeTab");
    };
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    localStorage.removeItem("userData");
    localStorage.removeItem("activeTab");
    navigate("/");
  };

  const handleSearchInput = (event) => {
    const input = event.target.value;
    setSearchQuery(input);
    if (input.length > 0) {
      const filtered = jobData.filter((job) =>
        job.toLowerCase().startsWith(input.toLowerCase())
      );
      setFilteredJobs(filtered);
    } else {
      setFilteredJobs([]);
    }
  };

  return (
    <div>
      {userInfo && (
        <AppBar
          position="fixed"
          style={{ top: 0, background: "white", zIndex: 999 }}
        >
          <Container maxWidth="100%">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/home"
                onClick={() => handleTabClick("home")}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontWeight: 700,
                  color: "black",
                  textDecoration: "none",
                  backgroundColor: "orange",
                  borderRadius: "10px",
                  padding: "5px",
                  fontFamily: "cursive",
                }}
              >
                Home Mate
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="black"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/home"
                  >
                    <Typography
                      onClick={() => handleTabClick("home")}
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "home" ? "orange" : "black",
                        textDecoration: "none",
                      }}
                    >
                      Home
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/job"
                  >
                    <Typography
                      onClick={() => handleTabClick("job")}
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "job" ? "orange" : "black",
                        textDecoration: "none",
                      }}
                    >
                      Job
                    </Typography>
                  </MenuItem>
                  <MenuItem
                    onClick={handleCloseNavMenu}
                    component={Link}
                    to="/worker"
                  >
                    <Typography
                      onClick={() => handleTabClick("worker")}
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "worker" ? "orange" : "black",
                        textDecoration: "none",
                      }}
                    >
                      Worker
                    </Typography>
                  </MenuItem>
                  {userData.role === "Admin" ? (
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/userlist"
                    >
                      <Typography
                        onClick={() => handleTabClick("user")}
                        textAlign="center"
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "user" ? "orange" : "black",
                          textDecoration: "none",
                        }}
                      >
                        User
                      </Typography>
                    </MenuItem>
                  ) : null}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component={Link}
                to="/home"
                onClick={() => handleTabClick("home")}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  fontWeight: 700,
                  textDecoration: "none",
                  color: "black",
                  backgroundColor: "orange",
                  borderRadius: "10px",
                  padding: "5px",
                  fontFamily: "cursive",
                }}
              >
                Home Mate
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/home"
                    onClick={() => handleTabClick("home")}
                    sx={{
                      mr: 4,
                      ml: 4,
                      display: { xs: "none", md: "flex" },
                      fontWeight: 700,
                      color: activeTab === "home" ? "orange" : "black",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </Typography>
                  {activeTab === "home" ? (
                    <div
                      style={{
                        bottom: "8px",
                        width: "50%",
                        margin: "auto",
                        height: "3px",
                        backgroundColor: "orange",
                        transition: "left 0.1s ease-in-out",
                        left: activeTab === "home" ? "0%" : "-100%",
                      }}
                    ></div>
                  ) : null}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/job"
                    onClick={() => handleTabClick("job")}
                    sx={{
                      mr: 4,
                      ml: 4,
                      display: { xs: "none", md: "flex" },
                      fontWeight: 700,
                      color: activeTab === "job" ? "orange" : "black",
                      textDecoration: "none",
                    }}
                  >
                    Job
                  </Typography>
                  {activeTab === "job" ? (
                    <div
                      style={{
                        bottom: "8px",
                        width: "50%",
                        margin: "auto",
                        height: "3px",
                        backgroundColor: "orange",
                        transition: "left 0.1s ease-in-out",
                      }}
                    ></div>
                  ) : null}
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/worker"
                    onClick={() => handleTabClick("worker")}
                    sx={{
                      mr: 4,
                      ml: 4,
                      display: { xs: "none", md: "flex" },
                      fontWeight: 700,
                      color: activeTab === "worker" ? "orange" : "black",
                      textDecoration: "none",
                    }}
                  >
                    Worker
                  </Typography>
                  {activeTab === "worker" ? (
                    <div
                      style={{
                        bottom: "8px",
                        width: "50%",
                        margin: "auto",
                        height: "3px",
                        backgroundColor: "orange",
                        transition: "left 0.1s ease-in-out",
                      }}
                    ></div>
                  ) : null}
                </Box>
              </Box>

              {userInfo && (
                <Box p={2}>
                  <Typography sx={{ color: "black" }}>
                    <b>
                      <ReactTyped
                        strings={[`Hi, ${userInfo.name} !`]}
                        typeSpeed={100}
                        showCursor={false}
                      />
                    </b>
                  </Typography>
                </Box>
              )}

              <Box sx={{ marginRight: "2%" }}>
                <Search placeholder="Enter a job name" width="300px" />
              </Box>
              <Tooltip title="Open notification">
                <IconButton aria-label="notification">
                  <Badge badgeContent={4} color="primary">
                    <NotificationsIcon color="black" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Open setting">
                <IconButton aria-label="notification">
                  <Badge color="primary">
                    <SettingsIcon color="black" />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {userInfo.avatar !== "" ? (
                      <Avatar src={userInfo.avatar} />
                    ) : (
                      <Avatar src="/broken-image.jpg" />
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem
                    onClick={handleCloseUserMenu}
                    component={Link}
                    to="/profile"
                  >
                    <Typography
                      onClick={() => handleTabClick("profile")}
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "profile" ? "red" : "inherit",
                        textDecoration: "none",
                        width: "100%",
                      }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography
                      component="a"
                      sx={{
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        width: "100%",
                      }}
                    >
                      Sign out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>

              {/* Remaining code */}
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
}
export default TopBar;
