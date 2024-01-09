import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link, useNavigate } from "react-router-dom";
import { get_user_info } from "../../services/userAPI";
// import SearchField from "./SearchField";

function TopBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigateToProfile = () => {
    navigate("/profile");
  };
  const navigateToUserList = () => {
    navigate("/userlist");
  };

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

  const navigate = useNavigate();

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

  const [activeTab, setActiveTab] = React.useState("catalog");

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");

    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("activeTab");
    navigate("/");
  };

  return (
    <div>
      {userInfo && (
        <AppBar
          position="fixed"
          style={{ top: 0, background: "#2E3B55", zIndex: 999 }}
        >
          <Container maxWidth="100%">
            <Toolbar disableGutters>
              <MenuBookIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/home"
                onClick={() => handleTabClick("home")}
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
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
                  color="inherit"
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
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      href="/home"
                      onClick={() => handleTabClick("home")}
                      textAlign="center"
                      component="a"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "home" ? "red" : "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Home
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      href="/job"
                      onClick={() => handleTabClick("job")}
                      textAlign="center"
                      component="a"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "job" ? "red" : "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Job
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      href="/worker"
                      onClick={() => handleTabClick("worker")}
                      textAlign="center"
                      component="a"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "worker" ? "red" : "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Worker
                    </Typography>
                  </MenuItem>
                  {userData.role === "Admin" ? (
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography
                        href="/userlist"
                        onClick={() => handleTabClick("user")}
                        textAlign="center"
                        component="a"
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "user" ? "red" : "inherit",
                          textDecoration: "none",
                        }}
                      >
                        User
                      </Typography>
                    </MenuItem>
                  ) : null}
                </Menu>
              </Box>
              <MenuBookIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component="a"
                href="/home"
                onClick={() => handleTabClick("home")}
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                Home Mate
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
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
                    color: activeTab === "home" ? "red" : "inherit",
                    textDecoration: "none",
                  }}
                >
                  Home
                </Typography>
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
                    color: activeTab === "job" ? "red" : "inherit",
                    textDecoration: "none",
                  }}
                >
                  Job
                </Typography>
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
                    color: activeTab === "worker" ? "red" : "inherit",
                    textDecoration: "none",
                  }}
                >
                  Worker
                </Typography>
                {userData.role === "Admin" ? (
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
                      color: activeTab === "user" ? "red" : "inherit",
                      textDecoration: "none",
                    }}
                  >
                    User
                  </Typography>
                ) : null}
              </Box>

              {userInfo && (
                <Box p={2}>
                  <Typography>
                    <b>{userInfo.name}</b>
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={navigateToProfile}
                      component="a"
                      sx={{
                        fontWeight: 700,
                        color: "inherit",
                        textDecoration: "none",
                        width: "100%",
                      }}
                    >
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={handleLogout}
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
