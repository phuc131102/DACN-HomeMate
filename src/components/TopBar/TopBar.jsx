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
  useMediaQuery,
  useTheme,
  Grid,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import BlockIcon from "@mui/icons-material/Block";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import Search from "../TopBar/Search";
import { get_noti, seen_noti } from "../../services/jobAPI";
import useUserInfo from "../../utils/userUtils/useUserInfo";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FlagIcon from "@mui/icons-material/Flag";
import VerifiedIcon from "@mui/icons-material/Verified";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
function TopBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotification, setAnchorElNotification] = useState(null);
  const [userData, setUserData] = useState(null);
  const [userNoti, setUserNoti] = useState(null);
  const [notiCount, setNotiCount] = useState(null);
  const [messCount, setMesCount] = useState(null);
  const [chat, setChat] = useState(null);
  const [activeTab, setActiveTab] = React.useState("home");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { userInfo } = useUserInfo(userData?.id);
  const { chatId } = useChatStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  const handleMessage = () => {
    navigate("/chat");
  };
  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserInfo = async () => {
        try {
          const response2 = await get_noti(userData.id);
          setUserNoti(response2);
          setNotiCount(
            response2.filter((notification) => notification.status === "Unread")
              .length
          );
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
  // console.log(messCount)
  // console.log(chatId)
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

  useEffect(() => {
    if (userData && userData.id) {
      const messNoti = async () => {
        const querySnapshot = await getDocs(collection(db, "contacts"));
        console.log(querySnapshot);
        const filtered = querySnapshot.docs.filter(
          (doc) => doc.id === userData.id
        );
        console.log(filtered);
        if (filtered.length === 0) {
          const createUser = async () => {
            console.log("vao r");
            try {
              await setDoc(doc(db, "contacts", userData.id), {
                chat: [],
              });
            } catch (err) {}
          };
          createUser();
        }
        console.log(userData.id);
        const unSub = onSnapshot(doc(db, "contacts", userData.id), (res) => {
          const arrayMes = res.data();
          let count = 0;
          arrayMes.chat.forEach((item) =>
            item.isSeen === false ? (count = count + 1) : ""
          );
          if (count > 0) {
            setMesCount(count);
          } else {
            setMesCount(null);
          }
        });
      };
      messNoti();
    }
  }, [userData, chatId]);

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
      setActiveTab("");
      localStorage.setItem("activeTab", "");
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
    localStorage.removeItem("chat-store");
    navigate("/signin");
    window.location.reload();
  };

  return (
    <div>
      {/* {userInfo && userNoti && ( */}
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
              to="/"
              onClick={() => handleTabClick("")}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontWeight: 700,
                color: "black",
                textDecoration: "none",
                backgroundColor: "orange",
                borderRadius: "10px",
                padding: "5px",
                fontFamily: "Segoe Script",
                minWidth: "125px",
              }}
            >
              Home Mate
            </Typography>

            <>
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
                    to="/"
                  >
                    <Typography
                      onClick={() => handleTabClick("")}
                      textAlign="center"
                      sx={{
                        fontWeight: 700,
                        color: activeTab === "" ? "blue" : "black",
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
                  {userData?.role === "Admin" ? (
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/admin"
                    >
                      <Typography
                        onClick={() => handleTabClick("admin")}
                        textAlign="center"
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "admin" ? "blue" : "black",
                          textDecoration: "none",
                        }}
                      >
                        Admin
                      </Typography>
                    </MenuItem>
                  ) : null}
                  {!userInfo && (
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/signin"
                    >
                      <Typography
                        onClick={() => handleTabClick("signin")}
                        textAlign="center"
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "signin" ? "blue" : "black",
                          textDecoration: "none",
                        }}
                      >
                        Sign in
                      </Typography>
                    </MenuItem>
                  )}
                  {!userInfo && (
                    <MenuItem
                      onClick={handleCloseNavMenu}
                      component={Link}
                      to="/signup"
                    >
                      <Typography
                        onClick={() => handleTabClick("signup")}
                        textAlign="center"
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "signup" ? "blue" : "black",
                          textDecoration: "none",
                        }}
                      >
                        Sign up
                      </Typography>
                    </MenuItem>
                  )}
                </Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Box>
                  <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    onClick={() => handleTabClick("")}
                    sx={{
                      mr: 4,
                      ml: 4,
                      display: { xs: "none", md: "flex" },
                      fontWeight: 700,
                      color: activeTab === "" ? "blue" : "black",
                      textDecoration: "none",
                    }}
                  >
                    Home
                  </Typography>
                  {activeTab === "" ? (
                    <div
                      style={{
                        bottom: "8px",
                        width: "50%",
                        margin: "auto",
                        height: "3px",
                        backgroundColor: "orange",
                        transition: "left 0.1s ease-in-out",
                        left: activeTab === "" ? "0%" : "-100%",
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
                {userData?.role === "Admin" && activeTab === "admin" ? (
                  <Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component={Link}
                      to="/admin"
                      onClick={() => handleTabClick("admin")}
                      sx={{
                        mr: 4,
                        ml: 4,
                        display: { xs: "none", md: "flex" },
                        fontWeight: 700,
                        color: "blue",
                        textDecoration: "none",
                      }}
                    >
                      Admin
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
                ) : userData?.role === "Admin" && activeTab !== "admin" ? (
                  <Box>
                    <Typography
                      variant="h6"
                      noWrap
                      component={Link}
                      to="/admin"
                      onClick={() => handleTabClick("admin")}
                      sx={{
                        mr: 4,
                        ml: 4,
                        display: { xs: "none", md: "flex" },
                        fontWeight: 700,
                        color: "black",
                        textDecoration: "none",
                      }}
                    >
                      Admin
                    </Typography>
                  </Box>
                ) : null}
              </Box>{" "}
            </>

            {userInfo ? (
              <Box p={2}>
                {!isSmallScreen && (
                  <Typography
                    sx={{
                      color: "black",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "default",
                      userSelect: "none",
                    }}
                  >
                    <b>
                      <ReactTyped
                        strings={[`Hi, ${userInfo.name} !`]}
                        typeSpeed={100}
                        showCursor={false}
                      />
                    </b>
                  </Typography>
                )}
              </Box>
            ) : (
              <Box p={2}>
                {!isSmallScreen && (
                  <Typography
                    sx={{
                      color: "black",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "default",
                      userSelect: "none",
                    }}
                  >
                    <b>
                      <ReactTyped
                        strings={[`Welcome to Home Mate website !`]}
                        typeSpeed={100}
                        showCursor={false}
                      />
                    </b>
                  </Typography>
                )}
              </Box>
            )}

            <Box
              sx={{
                marginRight: "1%",
                width: isSmallScreen ? "200px" : "255px",
              }}
            >
              <Search />
            </Box>
            {userInfo && userNoti && (
              <>
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
                          to={
                            card.job_id
                              ? `/job/${card.job_id}`
                              : card.type === "Block" || card.type === "Unblock"
                              ? `/profile/${userData.id}`
                              : card.type === "Report"
                              ? `/admin/4`
                              : card.type === "Verify" &&
                                userInfo.role === "Admin"
                              ? `/admin/6`
                              : `/profile/${userData.id}`
                          }
                          sx={{
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            backgroundColor:
                              card.status === "Read" ? "white" : "#C9B7B4",
                          }}
                        >
                          <Grid container spacing={!isSmallScreen ? 2 : 5}>
                            <Grid item xs={2}>
                              <Avatar
                                sx={
                                  card.job_id
                                    ? {
                                        width: 56,
                                        height: 56,
                                      }
                                    : card.type === "Block"
                                    ? {
                                        width: 56,
                                        height: 56,
                                        bgcolor: "red",
                                      }
                                    : card.type === "Report"
                                    ? {
                                        width: 56,
                                        height: 56,
                                        bgcolor: "orange",
                                      }
                                    : {
                                        width: 56,
                                        height: 56,
                                        bgcolor: "green",
                                      }
                                }
                                src={card.job_id && card.data.avt}
                              >
                                {card.type === "Block" && (
                                  <BlockIcon fontSize="large" />
                                )}
                                {card.type === "Unblock" && (
                                  <LockOpenIcon fontSize="large" />
                                )}
                                {card.type === "Report" && (
                                  <FlagIcon fontSize="large" />
                                )}
                                {card.type === "Verify" && (
                                  <VerifiedIcon fontSize="large" />
                                )}
                              </Avatar>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography
                                sx={{
                                  fontWeight: 700,
                                  fontSize: "15px",
                                  width: "100%",
                                }}
                              >
                                {card.data.message}
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
                            </Grid>
                          </Grid>
                        </MenuItem>
                      ))
                  )}
                </Menu>
                <IconButton
                  aria-label="notification"
                  onClick={handleMessage}
                  disabled={userInfo?.block ? true : false}
                >
                  <Badge badgeContent={messCount} color="primary">
                    <ChatBubbleIcon />
                  </Badge>
                </IconButton>
              </>
            )}

            <Box sx={{ flexGrow: 0, marginLeft: "1%" }}>
              {userInfo ? (
                <>
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
                </>
              ) : (
                <>
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
                  >
                    <Box>
                      <Typography
                        variant="h9"
                        noWrap
                        component={Link}
                        to="/signin"
                        onClick={() => handleTabClick("signin")}
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "signin" ? "blue" : "black",
                          textDecoration: "none",
                          mr: 2,
                        }}
                      >
                        Sign in
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="h9"
                        noWrap
                        component={Link}
                        to="/signup"
                        onClick={() => handleTabClick("signup")}
                        sx={{
                          fontWeight: 700,
                          color: activeTab === "signup" ? "blue" : "black",
                          textDecoration: "none",
                        }}
                      >
                        Sign up
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* )} */}
    </div>
  );
}
export default TopBar;
