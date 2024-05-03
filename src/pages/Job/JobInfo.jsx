import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Rating,
} from "@mui/material";
import {
  accept_list,
  apply_job,
  deleteJob,
  get_job_info,
  rating_worker,
  update_job,
  waiting_list,
  working_info,
} from "../../services/jobAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import { get_skill } from "../../services/skillAPI";
import avt_empty from "../../assets/avt_empty.png";
import AcceptButton from "../../components/Button/AcceptButton/AcceptButton";
import RejectButton from "../../components/Button/AcceptButton/RejectButton";
import JobDetail from "./Child/JobDetail";
import JobUpdate from "./Child/JobUpdate";
import StartJobButton from "../../components/Button/AcceptButton/StartJobButton";
import EndJobButton from "../../components/Button/AcceptButton/EndJobButton";
import StarIcon from "@mui/icons-material/Star";
import RateReviewIcon from "@mui/icons-material/RateReview";

const labels = {
  0: "0",
  0.5: "0.5",
  1: "1.0",
  1.5: "1.5",
  2: "2.0",
  2.5: "2.5",
  3: "3.0",
  3.5: "3.5",
  4: "4.0",
  4.5: "4.5",
  5: "5.0",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function JobInfo() {
  const [error, setError] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [waiting, setWaiting] = useState("");
  const [accept, setAccept] = useState("");
  const [working, setWorking] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [chooseSkill, setChooseSkill] = useState([]);

  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [ratingSuccess, setRatingSuccess] = useState(false);

  const params = useParams();
  const id = params.id.split("/").pop();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
  const [editMode, setEditMode] = useState(false);
  const [editedValues, setEditedValues] = useState({
    name: "",
    salary: "",
    email: "",
    phone_num: "",
    address: "",
    desc: "",
    requirement: "",
  });

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenRatingModal = () => {
    setShowRatingModal(true);
  };

  const handleCloseRatingModal = () => {
    setShowRatingModal(false);
  };

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
    modalRating: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 1000,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchJobInfo = async () => {
        setLoading(true);
        try {
          const response = await get_job_info(id);
          const response2 = await waiting_list(id);
          const response3 = await accept_list(id);
          setJobInfo(response);
          setChooseSkill(response.skill);
          setWaiting(response2);
          setAccept(response3);
        } catch (error) {
          console.error("Error fetching job information:", error);
        } finally {
          try {
            const response = await get_skill();
            setSkills(response.data);
          } catch (error) {
            console.error("Error fetching skill information:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchJobInfo();
    }
  }, [id, setJobInfo]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedWorking = await working_info();
        setWorking(fetchedWorking);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const handleDeleteJob = async (jobId) => {
    try {
      const deletionMessage = await deleteJob(jobId);
      navigate("/job");
      console.log(deletionMessage);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleUpdateJob = async () => {
    const requiredFields = [
      "name",
      "salary",
      "email",
      "phone_num",
      "datetime",
      "address",
      "desc",
      "max_num",
      "skill",
    ];
    const emptyFields = requiredFields.filter((field) => !editedValues[field]);

    if (emptyFields.length > 0) {
      setError("Please fill in all required fields.");
    } else {
      setLoading(true);
      try {
        const updatedValues = {
          id: id,
          name: editedValues.name,
          salary: editedValues.salary,
          email: editedValues.email,
          phone_num: editedValues.phone_num,
          datetime: editedValues.datetime,
          address: editedValues.address,
          desc: editedValues.desc,
          requirement: editedValues.requirement,
          max_num: editedValues.max_num,
          skill: chooseSkill,
        };
        console.log(updatedValues);
        await update_job(updatedValues);
        setJobInfo(editedValues);
        setEditMode(false);
        setError("");
        setLoading(false);
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      homeownerId: jobInfo.owner_id,
      workerId: userData.id,
      jobId: id,
    };

    try {
      const response = await apply_job(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Apply Job successfully:", response);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Hire failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (worker_id, rating) => {
    const updatedFormData = {
      workerId: worker_id,
      star: rating,
    };

    try {
      const response = await rating_worker(updatedFormData);
      if (response) {
        console.log("Rating successfully:", response);
        setRatingSuccess(true);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Failed:", error);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    if (!editMode) {
      setEditedValues(jobInfo);
      // setChooseSkill(jobInfo.skill);
    }
  };

  const handleCancelEditMode = () => {
    setChooseSkill(jobInfo.skill);
    setEditMode(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      [name]: value,
    }));
  };

  const handleDateTimeChange = (value) => {
    const formattedDateTime = formatDate(value);
    setEditedValues((prevEditedValues) => ({
      ...prevEditedValues,
      datetime: formattedDateTime,
    }));
  };

  const formatDate = (value) => {
    const date = new Date(value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  };

  var isWaiting = false;
  var isWorking = false;
  if (working) {
    isWaiting = working.some(
      (item) =>
        item.worker._id.$oid === userData.id &&
        item.job._id.$oid === id &&
        item.status === "Waiting"
    );
    isWorking = working.some(
      (item) =>
        item.worker._id.$oid === userData.id &&
        item.job._id.$oid === id &&
        item.status === "Active"
    );
  }

  return (
    <>
      <br />
      <div style={{ marginTop: "5%" }}>
        {jobInfo && (
          <>
            <form>
              {userData.role === "Homeowner" &&
              userData.id === jobInfo.owner_id ? (
                <Grid container spacing={2}>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        width: "15%",
                        marginRight: "5%",
                        borderRadius: "15px",
                      }}
                      onClick={() => {
                        if (editMode) {
                          handleUpdateJob();
                        } else {
                          toggleEditMode();
                        }
                      }}
                    >
                      {editMode ? "Save" : "Update Job"}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{
                        width: "15%",
                        marginLeft: "5%",
                        borderRadius: "15px",
                      }}
                      onClick={() => {
                        if (editMode) {
                          handleCancelEditMode();
                        } else {
                          handleOpenModal();
                        }
                      }}
                    >
                      {editMode ? "Cancel" : "Delete Job"}
                    </Button>
                  </Box>
                </Grid>
              ) : null}
              {error && (
                <Typography variant="body2" color="error" align="center">
                  {error}
                </Typography>
              )}
              {!editMode ? (
                <Box sx={{ width: "100%" }}>
                  <JobDetail
                    editMode={editMode}
                    jobInfo={jobInfo}
                    chooseSkill={chooseSkill}
                  ></JobDetail>
                  {userData.role === "Worker" ? (
                    <>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {!isWaiting && !isWorking ? (
                          <Button
                            variant="contained"
                            color="success"
                            sx={{
                              width: "15%",
                              borderRadius: "15px",
                              marginBottom: "2%",
                            }}
                            onClick={handleApply}
                          >
                            Apply
                          </Button>
                        ) : null}
                        {isWorking ? (
                          <Button
                            variant="contained"
                            color="success"
                            sx={{
                              width: "15%",
                              borderRadius: "15px",
                              marginBottom: "2%",
                            }}
                          >
                            Apply is accepted !
                          </Button>
                        ) : null}
                        {isWaiting ? (
                          <Button
                            variant="contained"
                            color="warning"
                            sx={{
                              width: "15%",
                              borderRadius: "15px",
                              marginBottom: "2%",
                            }}
                          >
                            Apply sent ! Waiting...
                          </Button>
                        ) : null}
                      </Box>
                    </>
                  ) : null}
                </Box>
              ) : (
                <JobUpdate
                  editMode={editMode}
                  jobInfo={jobInfo}
                  chooseSkill={chooseSkill}
                  editedValues={editedValues}
                  handleInputChange={handleInputChange}
                  skills={skills}
                  setChooseSkill={setChooseSkill}
                  handleDateTimeChange={handleDateTimeChange}
                />
              )}
            </form>
            {userData.role === "Homeowner" &&
            userData.id === jobInfo.owner_id &&
            waiting.length > 0 ? (
              <>
                <div
                  style={{
                    borderTop: "2px solid black",
                    width: "20%",
                    margin: "10px auto",
                  }}
                ></div>
                <Box
                  sx={{
                    width: "85%",
                    margin: "auto",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.primary"
                    gutterBottom
                  >
                    &nbsp;<b>New Apply</b>
                  </Typography>
                  <CardContent>
                    <Grid container spacing={5}>
                      {waiting.map((card, index) => (
                        <Grid item xs={6} sm={3} md={2} key={index}>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "20px",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            ></Grid>
                            <CardActionArea
                              component={Link}
                              to={`/worker/${card._id.$oid}`}
                            >
                              <CardMedia
                                component="img"
                                height="150"
                                image={
                                  card.avatar === "" ? avt_empty : card.avatar
                                }
                                alt={card.name}
                              />
                              <CardContent>
                                <Typography
                                  sx={{
                                    fontSize: 18,
                                    textAlign: "center",
                                    lineHeight: "1.2",
                                    maxHeight: "1.2em",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    display: "block",
                                  }}
                                  color="text.primary"
                                  gutterBottom
                                >
                                  <b>{card.name}</b>
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                              <AcceptButton
                                owner_id={userData.id}
                                job_id={id}
                                worker_id={card._id.$oid}
                              />
                              <RejectButton
                                owner_id={userData.id}
                                job_id={id}
                                worker_id={card._id.$oid}
                              />
                            </CardActions>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Box>
              </>
            ) : null}
            {userData.role === "Homeowner" &&
            userData.id === jobInfo.owner_id &&
            accept.length > 0 ? (
              <>
                <div
                  style={{
                    borderTop: "2px solid black",
                    width: "20%",
                    margin: "10px auto",
                  }}
                ></div>
                <Box
                  sx={{
                    width: "85%",
                    margin: "auto",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 30 }}
                    color="text.primary"
                    gutterBottom
                  >
                    &nbsp;<b>Working list</b>
                  </Typography>
                  <CardContent>
                    <Grid container spacing={5}>
                      {accept.map((card, index) => (
                        <Grid item xs={6} sm={3} md={2} key={index}>
                          <Card
                            sx={{
                              backgroundColor: "white",
                              borderRadius: "20px",
                              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            ></Grid>
                            <CardActionArea
                              component={Link}
                              to={`/worker/${card._id.$oid}`}
                            >
                              <CardMedia
                                component="img"
                                height="150"
                                image={
                                  card.avatar === "" ? avt_empty : card.avatar
                                }
                                alt={card.name}
                              />
                              <CardContent>
                                <Typography
                                  sx={{
                                    fontSize: 18,
                                    textAlign: "center",
                                    lineHeight: "1.2",
                                    maxHeight: "1.2em",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    display: "block",
                                  }}
                                  color="text.primary"
                                  gutterBottom
                                >
                                  <b>{card.name}</b>
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Box>
              </>
            ) : null}
            {userData.role === "Homeowner" &&
            userData.id === jobInfo.owner_id ? (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {accept.length >= 1 && jobInfo.status === "Available" ? (
                  <StartJobButton owner_id={userData.id} job_id={id} />
                ) : null}
                {jobInfo.status === "In Progress" ? (
                  <Button
                    variant="contained"
                    color="error"
                    sx={{
                      width: "15%",
                      borderRadius: "15px",
                      marginBottom: "2%",
                    }}
                    onClick={handleOpenRatingModal}
                  >
                    End Job
                  </Button>
                ) : null}
              </Box>
            ) : null}
            <Modal
              open={showModal}
              onClose={handleCloseModal}
              aria-labelledby="place-book-modal"
              aria-describedby="place-book-modal-description"
            >
              <Box sx={styles.modal}>
                <Typography
                  id="place-book-modal"
                  variant="h5"
                  textAlign="center"
                >
                  Confirm Deletion
                </Typography>
                <Typography variant="body1" textAlign="center" marginTop={2}>
                  Are you sure you want to delete this job?
                </Typography>
                <Stack direction="row" justifyContent="center" marginTop={4}>
                  <Button
                    variant="contained"
                    sx={styles.buttonRemove}
                    onClick={() => {
                      handleDeleteJob(id);
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
            {/* RATING MODAL */}
            <Modal
              open={showRatingModal}
              onClose={handleCloseRatingModal}
              aria-labelledby="place-book-modal"
              aria-describedby="place-book-modal-description"
            >
              <Box sx={styles.modalRating}>
                <Typography
                  id="place-book-modal"
                  variant="h5"
                  textAlign="center"
                >
                  <b>Are you sure you want to end this job?</b>
                </Typography>
                <Typography variant="h6" textAlign="center" marginTop={2}>
                  Leave a rating <StarIcon /> or feedback <RateReviewIcon /> for
                  these worker(s) below
                </Typography>
                <CardContent>
                  <Grid container spacing={5}>
                    {accept.map((card, index) => (
                      <Grid item xs={6} sm={3} md={3} key={index}>
                        <Card
                          sx={{
                            backgroundColor: "white",
                            borderRadius: "20px",
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          ></Grid>
                          <CardActionArea
                            component={Link}
                            to={`/worker/${card._id.$oid}`}
                          >
                            <CardMedia
                              component="img"
                              height="150"
                              image={
                                card.avatar === "" ? avt_empty : card.avatar
                              }
                              alt={card.name}
                            />
                            <CardContent>
                              <Typography
                                sx={{
                                  fontSize: 18,
                                  textAlign: "center",
                                  lineHeight: "1.2",
                                  maxHeight: "1.2em",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  display: "block",
                                }}
                                color="text.primary"
                                gutterBottom
                              >
                                <b>{card.name}</b>
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions sx={{ justifyContent: "center" }}>
                            <div>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Rating
                                  name="simple-controlled"
                                  value={value}
                                  precision={0.5}
                                  getLabelText={getLabelText}
                                  onChange={(event, newValue) => {
                                    setValue(newValue);
                                  }}
                                  onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                  }}
                                  readOnly={ratingSuccess}
                                />
                                {value !== null && (
                                  <Box sx={{ ml: 2 }}>
                                    {labels[hover !== -1 ? hover : value]}
                                  </Box>
                                )}
                              </div>
                              {!ratingSuccess ? (
                                <Button
                                  variant="contained"
                                  color="success"
                                  sx={{
                                    width: "100%",
                                    borderRadius: "15px",
                                    marginTop: "10px",
                                  }}
                                  onClick={() => {
                                    handleRating(card._id.$oid, value);
                                  }}
                                  disabled={value === 0}
                                >
                                  Send rating
                                </Button>
                              ) : (
                                <Typography
                                  sx={{ textAlign: "center", color: "green" }}
                                >
                                  Rating sent !
                                </Typography>
                              )}
                            </div>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </CardContent>
                <Stack direction="row" justifyContent="center" marginTop={4}>
                  <EndJobButton owner_id={userData.id} job_id={id} />
                  <Button
                    variant="contained"
                    sx={styles.button}
                    onClick={handleCloseRatingModal}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </>
        )}
      </div>
    </>
  );
}

export default JobInfo;
