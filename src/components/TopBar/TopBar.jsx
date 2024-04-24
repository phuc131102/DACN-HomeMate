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
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { get_user_info } from "../../services/userAPI";
import { ReactTyped } from "react-typed";

function TopBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();

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
    const activeTabIndicator = document.querySelector('.active-tab-indicator');
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
        <AppBar position="fixed" style={{ top: 0, background: "white", zIndex: 999 }}>
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
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
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
                  {['home', 'job', 'worker'].map((tab) => (
                    <MenuItem
                      key={tab}
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to={`/${tab}`}
                    >
                      <Typography
                        onClick={() => handleTabClick(tab)}
                        textAlign="center"
                        sx={{
                          fontWeight: 700,
                          color: activeTab === tab ? "blue" : "black",
                          textDecoration: "none",
                        }}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </Typography>
                    </MenuItem>
                  ))}
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
                  flexGrow: 1,
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                Home Mate
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {['home', 'job', 'worker'].map((tab) => (
                  <Box key={tab} className={`tab-${tab}`}>
                    <Typography
                      variant="h6"
                      noWrap
                      component={Link}
                      to={`/${tab}`}
                      onClick={() => handleTabClick(tab)}
                      sx={{
                        mr: 4,
                        ml: 4,
                        fontWeight: 700,
                        color: activeTab === tab ? "blue" : "black",
                        textDecoration: "none",
                      }}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Typography>
                    {activeTab === tab && (
                      <div className="active-tab-indicator" style={{
                        bottom: "8px",
                        width: "50%",
                        margin: "auto",
                        height: "3px",
                        backgroundColor: "cyan",
                        transition: "left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1), background-color 0.3s ease-in-out"
                      }}></div>
                    )}
                  </Box>
                ))}
              </Box>

              {userInfo && (
                <Box p={2}>
                  <Typography sx={{ color: "black" }}>
                    <b>
                      <ReactTyped
                        strings={[`Hi, ${userInfo.name}`]}
                        typeSpeed={100}
                        showCursor={false}
                      />
                    </b>
                  </Typography>
                  </Box>
              )}

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
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
              <IconButton aria-label="notification">
                <Badge
                  badgeContent={4}
                  color="primary"
                  sx={{ marginLeft: "15px", marginRight: "15px" }}
                >
                  <NotificationsIcon color="black" />
                </Badge>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
}
export default TopBar;

