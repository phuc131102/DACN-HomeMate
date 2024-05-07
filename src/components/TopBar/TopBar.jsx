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
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { get_user_info } from "../../services/userAPI";
import { ReactTyped } from "react-typed";
import Search from "../TopBar/Search";
import { get_noti, seen_noti } from "../../services/jobAPI";

function TopBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [userNoti, setUserNoti] = useState(null);
  const [notiCount, setNotiCount] = useState(null);
  const [activeTab, setActiveTab] = React.useState("home");

  const navigate = useNavigate();
  const location = useLocation();

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
          const response2 = await get_noti(userData.id);
          setUserInfo(response);
          setUserNoti(response2);
          setNotiCount(
            response2.filter((notification) => notification.status === "Unread")
              .length
          );
          console.log(response2);
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
    } else {
      setActiveTab("");
    }
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    const tab = pathname.split("/")[1];
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  }, [location.pathname]);

  useEffect(() => {
    if (anchorElNotification) {
      setNotiCount(0);
    }
  }, [anchorElNotification]);

  const handleSeen = async () => {
    const data = {
      userId: userData.id,
    };
    try {
      const response = await seen_noti(data);
      if (response) {
        console.log(response);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

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

  const handleOpenNotification = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotification = () => {
    handleSeen();
    setAnchorElNotification(null);
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
                        color: activeTab === "home" ? "blue" : "black",
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
                        color: activeTab === "job" ? "blue" : "black",
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
                        color: activeTab === "worker" ? "blue" : "black",
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
                          color: activeTab === "user" ? "blue" : "black",
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
                      color: activeTab === "home" ? "blue" : "black",
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
                      color: activeTab === "job" ? "blue" : "black",
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
                      color: activeTab === "worker" ? "blue" : "black",
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
                {userData.role === "Admin" && activeTab === "user" ? (
                  <Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component={Link}
                      to="/userlist"
                      onClick={() => handleTabClick("user")}
                      sx={{
                        mr: 4,
                        ml: 4,
                        display: { xs: "none", md: "flex" },
                        fontWeight: 700,
                        color: "blue",
                        textDecoration: "none",
                      }}
                    >
                      User
                    </Typography>
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
                  </Box>
                ) : userData.role === "Admin" && activeTab !== "user" ? (
                  <Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component={Link}
                      to="/userlist"
                      onClick={() => handleTabClick("user")}
                      sx={{
                        mr: 4,
                        ml: 4,
                        display: { xs: "none", md: "flex" },
                        fontWeight: 700,
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      User
                    </Typography>
                  </Box>
                ) : null}
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
                <Search />
              </Box>
              <Tooltip title="Open notification">
                <IconButton
                  onClick={handleOpenNotification}
                  aria-label="notification"
                >
                  <Badge badgeContent={notiCount} color="primary">
                    <NotificationsIcon color="black" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: "45px",
                  "& .MuiPaper-root": {
                    maxWidth: 500,
                    maxHeight: 500,
                  },
                  "& .MuiMenuItem-root": {
                    borderTop: "1px solid #e0e0e0",
                  },
                }}
                id="menu-appbar"
                anchorEl={anchorElNotification}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElNotification)}
                onClose={handleCloseNotification}
              >
                {userNoti.length === 0 ? (
                  <MenuItem
                    style={{ cursor: "default" }}
                    onClick={handleCloseNotification}
                  >
                    There is no any notification.
                  </MenuItem>
                ) : (
                  userNoti
                    .slice()
                    .reverse()
                    .map((card, index) => (
                      <MenuItem
                        key={index}
                        onClick={handleCloseNotification}
                        component={Link}
                        to={`/job/${card.job_id}`}
                        sx={{
                          whiteSpace: "normal",
                          overflowWrap: "break-word",
                          backgroundColor:
                            card.status === "Read" ? "white" : "#C9B7B4",
                        }}
                      >
                        <div>
                          <Typography
                            sx={{
                              fontWeight: 700,
                              fontSize: "15px",
                              width: "100%",
                            }}
                          >
                            {card.message}
                          </Typography>
                          <Typography
                            sx={{
                              fontWeight: 200,
                              fontSize: "13px",
                              width: "100%",
                            }}
                          >
                            - {card.datetime}
                          </Typography>
                        </div>
                      </MenuItem>
                    ))
                )}
              </Menu>
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
                    to={`/profile/${userData.id}`}
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
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
}
export default TopBar;