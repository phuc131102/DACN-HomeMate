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
import { ReactTyped } from "react-typed";

function TopBar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [navValue, setNavValue] = useState("home");
    const navRef = useRef({});
    const [indicatorStyle, setIndicatorStyle] = useState({});

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
        if (navRef.current[navValue]) {
            const { offsetLeft, clientWidth } = navRef.current[navValue];
            setIndicatorStyle({
                left: offsetLeft,
                width: clientWidth,
                opacity: 1,
            });
        }
    }, [navValue]);

    const navigate = useNavigate();

    const handleNavItemClick = (event, newValue) => {
        setNavValue(newValue);
        handleCloseNavMenu();
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
        handleCloseUserMenu();
        localStorage.clear();
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
                        color: activeTab === "home" ? "red" : "inherit",
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
                        color: activeTab === "job" ? "red" : "inherit",
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
                        color: activeTab === "worker" ? "red" : "inherit",
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
            </Toolbar>
          </Container>
        </AppBar>
      )}
    </div>
  );
}

export default TopBar;
