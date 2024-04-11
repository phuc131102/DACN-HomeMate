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

function WorkerInfo() {
  const [userData, setUserData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cvInfo, setCvInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    if (userData && userData.id) {
      const fetchData = async () => {
        try {
          const fetchedJobs = await myJob(userData.id);
          setJobs(fetchedJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setLoading(false);
        } finally {
          setLoading(false);
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
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      margin: "auto",
                      marginBottom: "100px",
                    }}
                  >
                    <ThemeProvider theme={finalTheme}>
                      <>
                        <Grid item xs={12}>
                          {userInfo.avatar === "" ? (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                alt="Kisspng computer"
                                src={avtEmpty}
                                style={{
                                  width: "30%",
                                  height: "auto",
                                  marginTop: "20%",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                alt={userInfo.avatar}
                                src={userInfo.avatar}
                                style={{
                                  width: "30%",
                                  height: "auto",
                                  marginTop: "20%",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                                }}
                              />
                            </Box>
                          )}
                        </Grid>
                      </>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h3">
                            <b>{userInfo.name}</b>
                          </Typography>
                        </Box>
                      </Grid>
                      {userData.role === "Homeowner" ? (
                        <>
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
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
                                display: "flex",
                                justifyContent: "center",
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
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "500px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    padding: "20px",
                    margin: "auto",
                    position: "sticky",
                    transform: "translateY(0%)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "90%",
                      margin: "auto",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <ThemeProvider theme={finalTheme}>
                      <form>
                        <br />
                        <>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="User Name"
                              defaultValue={userInfo.name}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="Email"
                              defaultValue={userInfo.email}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="Address"
                              defaultValue={
                                userInfo.address === ""
                                  ? "N/A"
                                  : userInfo.address
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="Phone Number"
                              defaultValue={
                                userInfo.address === ""
                                  ? "N/A"
                                  : userInfo.phone_num
                              }
                            />
                          </Grid>
                        </>
                      </form>
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h6">Rating: </Typography>
            <Rating
              value={rating}
              onChange={handleRatingChange}
              max={5}
              precision={0.5}
            />
            <Button variant="contained" color="primary" onClick={handleSubmitRating} disabled={ratingSubmitted}>
              Submit
            </Button>
          </Box>
          {cvInfo && cvInfo.message === "CV not found" ? (
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
                  {" "}
                  <ComponentDivider>CV</ComponentDivider>
                </Grid>
                {/* <Grid container item xs={12}>
                  <Box
                    sx={{
                      width: "80%",
                      margin: "auto",
                      marginBottom: "50px",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <ViewCv cvinfo={cvInfo.data} />
                      </Grid>

                      <Grid container item xs={12} sx={{}}>
                        <Grid item xs={8}></Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid> */}
              </Grid>
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
