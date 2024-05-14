import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  block_user,
  deleteUser,
  get_user_info,
  unblock_user,
} from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import ViewCv from "../ViewCv/ViewCv";
import { get_cv_info } from "../../services/cvAPI";
import ComponentDivider from "../../components/ComponentDivider/ComponentDivider";
import avtEmpty from "../../assets/avt_empty.png";
import { myJob, hire_worker, return_worker } from "../../services/jobAPI";
import Avt from "./Child/Avt";
import LeftSide from "./Child/LeftSide";
import Rate from "./Child/Rating";
import BigCard from "../../components/BigCard/BigCard";
import MyJob from "../Profile/Child/Myjob";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function WorkerInfo() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [cvinfo, setCvInfo] = useState({});

  const finalTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              borderRadius: 20,
            }),
        },
      },
    },
  });
  const styles = {
    button: {
      backgroundColor: "green",
      color: "#fff",
      fontWeight: 600,
      borderRadius: 15,
      maxWidth: "500px",
      marginRight: "10px",
      minWidth: "150px",
      padding: "5px 10px",
      fontSize: "1.2rem",
    },
    buttonRemove: {
      backgroundColor: "red",
      color: "#fff",
      fontWeight: 600,
      borderRadius: 15,
      maxWidth: "500px",
      marginRight: "10px",
      minWidth: "150px",
      padding: "5px 10px",
      fontSize: "1.2rem",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };

  // const styles = {
  //   button: {
  //     backgroundColor: "red",
  //     color: "#fff",
  //     fontWeight: 600,
  //     borderRadius: 15,
  //     maxWidth: "500px",
  //     marginRight: "10px",
  //     minWidth: "150px",
  //     padding: "5px 10px",
  //     fontSize: "1.2rem",
  //   },
  //   modal: {
  //     position: "absolute",
  //     top: "50%",
  //     left: "50%",
  //     transform: "translate(-50%, -50%)",

  //     bgcolor: "background.paper",
  //     boxShadow: 24,
  //     p: 4,
  //   },
  // };

  const params = useParams();
  const id = params.id.split("/").pop();
  // const handleOpenModal = () => {
  //   setShowModal(true);
  // };

  // const handleCloseModal = () => {
  //   setShowModal(false);
  // };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id && id) {
      const fetchData = async () => {
        try {
          const fetchedJobs = await myJob(userData.id);
          setJobs(fetchedJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setLoading(false);
        } finally {
          try {
            const response = await get_user_info(id);
            setUserInfo(response);
          } catch (error) {
            console.error("Error fetching user information:", error);
          } finally {
            try {
              const response = await get_cv_info(id);
              setCvInfo(response);
              console.log(response.data);
            } catch (error) {
              console.error("Error fetching cv information:", error);
            } finally {
              setLoading(false);
            }
          }
        }
      };

      fetchData();
    }
  }, [userData]);

  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_user_info(id);
          setUserInfo(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          try {
            const response = await get_cv_info(id);
            setCvInfo(response);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching cv information:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchUserInfo();
    }
  }, [id]);

  const handleDeleteUser = async (id) => {
    try {
      const deletionMessage = await deleteUser(id);
      navigate("/admin");
      console.log(deletionMessage);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleBlockUser = async () => {
    try {
      const response = await block_user(id);
      navigate("/admin");
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleUnblockUser = async () => {
    try {
      const response = await unblock_user(id);
      navigate("/admin");
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  // const handleHire = async (jobId, e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const updatedFormData = {
  //     homeownerId: userData.id,
  //     workerId: id,
  //     jobId: jobId,
  //   };

  //   try {
  //     const response = await hire_worker(updatedFormData);
  //     if (response) {
  //       window.location.reload();
  //       console.log("Hire Worker successfully:", response);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //     }
  //     console.error("Hire failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const handleRating = async (jobId, e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   const updatedFormData = {
  //     homeownerId: userData.id,
  //     workerId: id,
  //     jobId: jobId,
  //   };
  //   console.log(updatedFormData);
  //   try {
  //     const response = await return_worker(updatedFormData);
  //     if (response) {
  //       window.location.reload();
  //       console.log("Rating worker successfully:", response);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //     }
  //     console.error("Rating failed:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {userInfo && (
        <>
          <Box
            sx={{
              width: isMd ? "60%" : "100%",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <Grid
              container
              sx={{
                margin: "auto",
                marginBottom: "20px",
              }}
            >
              <BigCard>
                <ThemeProvider theme={finalTheme}>
                  <Grid container sx={{ marginTop: "10%", marginBottom: "5%" }}>
                    <Grid item xs={12} md={4}>
                      <>
                        <Avt avtEmpty={avtEmpty} userInfo={userInfo} />
                      </>
                    </Grid>
                    <Grid
                      item
                      container
                      xs={12}
                      md={8}
                    >
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent:isMd? "flex-start":"center",
                          }}
                        >
                          <Typography variant="h3">
                            <b>{userInfo.name}</b>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: isMd? "flex-start":"center",
                          }}
                        >
                          <Typography variant="h4">
                            Role: {userInfo.role}
                          </Typography>
                        </Box>
                      </Grid>
                      {userInfo.block ? (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              textAlign: "center",
                            }}
                          >
                            <Typography sx={{ fontSize: "20px", color: "red" }}>
                              <b>USER IS BLOCKED</b>
                            </Typography>
                          </Box>
                        </Grid>
                      ) : null}
                      {userData.role === "Admin" &&
                      userInfo.role !== "Admin" ? (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                            }}
                          >
                            <Button
                              variant="contained"
                              color={!userInfo.block ? "warning" : "success"}
                              sx={{
                                width: "40%",
                                borderRadius: "15px",
                                margin: "auto",
                              }}
                              onClick={() => {
                                handleOpenModal2();
                              }}
                            >
                              {!userInfo.block ? "Block User" : "Unblock User"}
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              sx={{
                                width: "40%",
                                borderRadius: "15px",
                                margin: "auto",
                              }}
                              onClick={() => {
                                handleOpenModal();
                              }}
                            >
                              Delete User
                            </Button>
                          </Box>
                        </Grid>
                      ) : null}
                      {/* {userData.role === "Homeowner" ? (
                        <>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "100%",
                              }}
                            >
                              <Typography variant="h5">
                                <b
                                  style={{
                                    color:
                                      userInfo.status !== "Hired"
                                        ? "green"
                                        : "red",
                                  }}
                                >
                                  Status:{" "}
                                  {userInfo.status !== "Hired"
                                    ? "Available"
                                    : "Hired"}
                                </b>
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "100%",
                                marginTop: "1%",
                              }}
                            >
                              {userInfo.status === "Hired" ? (
                                userInfo.working_detail.homeownerId ===
                                userData.id ? (
                                  <Button
                                    variant="contained"
                                    color="success"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleRating(
                                        userInfo.working_detail.jobId,
                                        e
                                      );
                                    }}
                                  >
                                    Rating
                                  </Button>
                                ) : (
                                  <Button variant="contained" color="error">
                                    Not Available
                                  </Button>
                                )
                              ) : (
                                <Button
                                  variant="contained"
                                  onClick={() => {
                                    handleOpenModal();
                                  }}
                                >
                                  Hire
                                </Button>
                              )}
                            </Box>
                          </Grid>
                        </>
                      ) : null} */}
                    </Grid>
                  </Grid>
                </ThemeProvider>
              </BigCard>
            </Grid>
            <Grid container sx={{ marginBottom: "20px" }} spacing={3}>
              <Grid item xs={12} md={4}>
                <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                  <LeftSide profile={userInfo} />
                </Grid>
                {userInfo.rating ? (
                  <Grid item xs={12}>
                    <Rate rating={userInfo.rating} />
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{marginBottom: "20px" }}>
                  <BigCard>
                    <Grid container>
                      <Grid container item xs={12}>
                        {userInfo.role === "Worker" ? (
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "right",
                            }}
                          >
                            {cvinfo.message === "CV not found" ? (
                              <>
                                <Grid container>
                                  <Grid item xs={12} sx={{ marginTop: "15px" }}>
                                    <ComponentDivider>CV</ComponentDivider>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box
                                      sx={{
                                        justifyContent: "center",
                                        marginBottom: "50px",
                                        marginTop: "15px",
                                        display: "flex",
                                      }}
                                    >
                                      No CV available.
                                    </Box>
                                  </Grid>
                                </Grid>
                              </>
                            ) : (
                              <>
                                <Grid container>
                                  <Grid item xs={12} sx={{ marginTop: "15px" }}>
                                    <ComponentDivider>CV</ComponentDivider>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <ViewCv cvinfo={cvinfo.data} />
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </Box>
                        ) : (
                          <Grid container>
                            <Grid item xs={12} sx={{ marginTop: "15px" }}>
                              <ComponentDivider>Job</ComponentDivider>
                            </Grid>
                            <Box
                              sx={{
                                width: "90%",
                                margin: "auto",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <MyJob id={id} />
                            </Box>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </BigCard>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="place-book-modal"
        aria-describedby="place-book-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="place-book-modal" variant="h5" textAlign="center">
            Confirm Deletion
          </Typography>
          <Typography variant="body1" textAlign="center" marginTop={2}>
            Are you sure you want to delete this user?
          </Typography>
          <Stack direction="row" justifyContent="center" marginTop={4}>
            <Button
              variant="contained"
              sx={styles.buttonRemove}
              onClick={() => {
                handleDeleteUser(id);
              }}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
      {userInfo ? (
        <Modal
          open={showModal2}
          onClose={handleCloseModal2}
          aria-labelledby="place-book-modal"
          aria-describedby="place-book-modal-description"
        >
          <Box sx={styles.modal}>
            <Typography id="place-book-modal" variant="h5" textAlign="center">
              <b>{!userInfo.block ? "Confirm Block" : "Confirm Unblock"}</b>
            </Typography>
            {!userInfo.block && userInfo.role === "Homeowner" ? (
              <Typography variant="body1" textAlign="center" marginTop={2}>
                This action will restrict <b>Homeowner</b> from{" "}
                <b>creating new job</b>. <br />
              </Typography>
            ) : !userInfo.block && userInfo.role === "Worker" ? (
              <Typography variant="body1" textAlign="center" marginTop={2}>
                This action will restrict <b>Worker</b> from <b>applying job</b>
                . <br />
              </Typography>
            ) : null}
            <Typography variant="body1" textAlign="center" marginTop={2}>
              {!userInfo.block
                ? "Are you sure you want to block this user?"
                : "Are you sure you want to unblock this user?"}
            </Typography>
            <Stack direction="row" justifyContent="center" marginTop={4}>
              <Button
                variant="contained"
                sx={!userInfo.block ? styles.buttonRemove : styles.button}
                onClick={() => {
                  !userInfo.block ? handleBlockUser() : handleUnblockUser();
                }}
              >
                {!userInfo.block ? "Block" : "Unblock"}
              </Button>

              <Button
                variant="contained"
                sx={!userInfo.block ? styles.button : styles.buttonRemove}
                onClick={handleCloseModal2}
              >
                Cancel
              </Button>
            </Stack>
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}

export default WorkerInfo;
