import React, { useState, useEffect, useRef } from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, MenuItem, Container, Avatar, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { get_user_info } from "../../services/userAPI";

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

    const handleLogout = () => {
        handleCloseUserMenu();
        localStorage.clear();
        navigate("/");
    };

    return (
        <div>
            {userInfo && (
                <AppBar position="fixed" sx={{ top: 0, bgcolor: "primary.dark", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                                onClick={handleOpenNavMenu}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                keepMounted
                                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{ display: { xs: 'block', md: 'none' } }}
                            >
                                {['Home', 'Job', 'Worker', 'User'].map((tab) => (
                                    userData && (userData.role === "Admin" || tab !== "User") ? <MenuItem key={tab} onClick={(event) => { handleNavItemClick(event, tab.toLowerCase()); handleCloseNavMenu(); }} component={Link} to={`/${tab.toLowerCase()}`}>
                                        <Typography textAlign="center">{tab}</Typography>
                                    </MenuItem> : null
                                ))}
                            </Menu>
                            <Typography
                                variant="h6"
                                noWrap
                                component={Link}
                                to="/home"
                                onClick={() => handleNavItemClick(null, "home")}
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: 'flex', md: 'flex' },
                                    fontWeight: 700,
                                    letterSpacing: ".3rem",
                                    color: "inherit",
                                    textDecoration: "none",
                                }}
                            >
                                Home Mate
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, position: 'relative', alignItems: 'center' }}>
                        {['Home', 'Job', 'Worker'].map((tab) => (
                            <Typography
                                key={tab}
                                variant="h6"
                                noWrap
                                component={Link}
                                to={`/${tab.toLowerCase()}`}
                                ref={(el) => navRef.current[tab.toLowerCase()] = el}
                                onClick={(event) => handleNavItemClick(event, tab.toLowerCase())}
                                sx={{
                                    mr: 4, ml: 4,
                                    color: navValue === tab.toLowerCase() ? 'cyan' : 'inherit',
                                    cursor: 'pointer',
                                    textDecoration: 'none'
                                }}
                            >
                                {tab}
                            </Typography>
                        ))}
                              <Box sx={{
                                  position: 'absolute',
                                  bottom: 0,
                                  left: 0,
                                  height: '4px',
                                  width: indicatorStyle.width,
                                  bgcolor: 'red',
                                  transition: 'all 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',  // Example of using cubic-bezier for a smoother animation
                                  ...indicatorStyle
                              }} />
                          </Box>
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar src={userInfo.avatar || "/broken-image.jpg"} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-user"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    keepMounted
                                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                                        <Typography textAlign="center">Profile</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Sign out</Typography>
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
