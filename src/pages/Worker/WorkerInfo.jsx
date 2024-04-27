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
import { get_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import ViewCv from "../ViewCv/ViewCv";
import { get_cv_info } from "../../services/cvAPI";
import ComponentDivider from "../../components/ComponentDivider/ComponentDivider";
import avtEmpty from "../../assets/avt_empty.png";
import { myJob, hire_worker, return_worker } from "../../services/jobAPI";
import Avt from "./Child/Avt";
import LeftSide from "./Child/LeftSide";
import Rating from "./Child/Rating";
import BigCard from "../../components/BigCard/BigCard";

function WorkerInfo() {
  const [userData, setUserData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
      // width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };

  const params = useParams();
  const id = params.id.split("/").pop();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  console.log(cvinfo);
  const handleHire = async (jobId, e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      homeownerId: userData.id,
      workerId: id,
      jobId: jobId,
    };
    console.log(updatedFormData);
    try {
      const response = await hire_worker(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Hire Worker successfully:", response);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Hire failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (jobId, e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      homeownerId: userData.id,
      workerId: id,
      jobId: jobId,
    };
    console.log(updatedFormData);
    try {
      const response = await return_worker(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Rating worker successfully:", response);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Rating failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {userInfo && (
        <>
          <Box
            sx={{
              width: "60%",
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
                    <Grid item xs={4}>
                      <>
                        <Avt avtEmpty={avtEmpty} userInfo={userInfo} />
                      </>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h3">
                        <b>{userInfo.name}</b>
                      </Typography>

                      {userData.role === "Homeowner" ? (
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
                      ) : null}
                    </Grid>
                  </Grid>
                </ThemeProvider>
              </BigCard>
            </Grid>
            <Grid container sx={{ marginBottom: "20px" }}>
              <Grid item xs={4}>
                <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                  <LeftSide profile={userInfo} />
                </Grid>
                <Grid item xs={12}>
                  <Rating />
                </Grid>
              </Grid>
              <Grid item xs={8}>
                <Box sx={{ marginLeft: "20px", marginBottom:"20px" }}>
                  <BigCard>
                    <Grid container>
                      {/* <Grid item xs={12}>
                      {" "}
                      <ComponentDivider>CV</ComponentDivider>
                    </Grid> */}
                      <Grid container item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            marginLeft: "20px",

                            display: "flex",
                            justifyContent: "right",
                          }}
                        >
                          {cvinfo.message === "CV not found" ? (
                            <>
                              <Grid container>
                                <Grid item xs={12}>
                                  {" "}
                                  <ComponentDivider>CV</ComponentDivider>
                                </Grid>
                                <Grid item xs={12}>
                                  <Box
                                    sx={{
                                      justifyContent: "center",
                                      marginBottom: "50px",
                                      marginTop: "10px",
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
                                <Grid item xs={12}>
                                  <ViewCv cvinfo={cvinfo.data} />
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </BigCard>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="place-book-modal"
            aria-describedby="place-book-modal-description"
          >
            <Box sx={styles.modal}>
              <Typography id="place-book-modal" variant="h5" textAlign="center">
                Choose a job
              </Typography>
              <TableContainer
                component={Paper}
                sx={{
                  margin: "auto",
                  marginTop: "3%",
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Job Image</TableCell>
                      <TableCell>Job Name</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {jobs.map((job, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Avatar src={job.image} alt={job.name} />
                        </TableCell>
                        <TableCell>{job.name}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            onClick={(e) => {
                              e.preventDefault();
                              handleHire(job._id.$oid, e);
                            }}
                          >
                            Choose
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Stack direction="row" justifyContent="center" marginTop={4}>
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
        </>
      )}
    </div>
  );
}

export default WorkerInfo;