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
} from "@mui/material";
import {
  accept_list,
  apply_job,
  cancel_apply,
  deleteJob,
  get_job_info,
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
import CardRating from "./Child/CardRating";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useUserInfo from "../../utils/userUtils/useUserInfo";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

function JobInfo() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [error, setError] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [waiting, setWaiting] = useState("");
  const [accept, setAccept] = useState("");
  const [working, setWorking] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showCVModal, setShowCVModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [chooseSkill, setChooseSkill] = useState([]);
  const { userInfo } = useUserInfo(userData?.id);
  const { userInfo: ownerInfo } = useUserInfo(jobInfo?.owner_id);

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
    max_num: "",
    image: "",
    datetime: "",
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

  const handleOpenCVModal = () => {
    setShowCVModal(true);
  };

  const handleCloseCVModal = () => {
    setShowCVModal(false);
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
      width: isMd ? 1000 : "90%",
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
          setEditedValues({
            name: response.name,
            salary: response.salary,
            email: response.email,
            phone_num: response.phone_num,
            address: response.address,
            desc: response.desc,
            requirement: response.requirement,
            max_num: response.max_num,
            image: response.image,
            datetime: response.datetime,
          });
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
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }
        }
      };
      fetchJobInfo();
    }
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedWorking = await working_info();
        setWorking(fetchedWorking);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };

    fetchData();
  }, []);

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
          image: editedValues.image,
        };
        console.log(updatedValues);
        await update_job(updatedValues);
        setJobInfo(updatedValues);
        setEditMode(false);
        setError("");
        setLoading(false);
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };

  const handleApply = async (e) => {
    if (!userInfo.cv_created) {
      handleOpenCVModal();
      return;
    }

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
        console.log("Apply successfully:", response);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Apply failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelApply = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      homeownerId: jobInfo.owner_id,
      workerId: userData.id,
      jobId: id,
    };

    try {
      const response = await cancel_apply(updatedFormData);
      if (response) {
        window.location.reload();
        console.log("Cancel successfully:", response);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Cancel failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    if (!editMode) {
      setEditedValues(jobInfo);
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

  const handleCreateCV = () => {
    navigate("/createCv");
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <br />
          <div style={{ marginTop: isMd ? "5%" : "20%" }}>
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
                          disabled={userInfo.block ? true : false}
                          sx={{
                            width: isMd ? "10%" : "150px",
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
                          {editMode ? <SaveIcon /> : <TipsAndUpdatesIcon />}
                          &nbsp;{editMode ? "Save" : "Update Job"}
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          disabled={userInfo.block ? true : false}
                          sx={{
                            width: isMd ? "10%" : "150px",
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
                          {editMode ? <ReplyAllIcon /> : <DeleteIcon />}&nbsp;
                          {editMode ? "Cancel" : "Delete Job"}
                        </Button>
                      </Box>
                    </Grid>
                  ) : null}
                  {userData.role === "Admin" ? (
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
                          color="error"
                          sx={{
                            width: isMd ? "10%" : "150px",
                            borderRadius: "15px",
                          }}
                          onClick={handleOpenModal}
                        >
                          <DeleteIcon /> &nbsp;Delete Job
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
                    <Box sx={{ width: "100%", marginTop: "10px" }}>
                      <JobDetail
                        userData={userData}
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
                              marginTop: "10px",
                              justifyContent: "center",
                            }}
                          >
                            {!isWaiting &&
                            !isWorking &&
                            jobInfo.status === "Available" ? (
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  marginBottom: "2%",
                                  alignItems: "center",
                                  width: "20%",
                                }}
                              >
                                {
                                  <Button
                                    variant="contained"
                                    color="success"
                                    sx={{
                                      width: "100%",
                                      borderRadius: "15px",
                                      marginBottom: "2%",
                                    }}
                                    onClick={handleApply}
                                    disabled={userInfo.block ? true : false}
                                  >
                                    Apply
                                  </Button>
                                }
                                {userInfo.block ? (
                                  <Typography
                                    sx={{
                                      color: "red",
                                      fontSize: "15px",
                                      marginBottom: "2%",
                                    }}
                                  >
                                    *This feature has blocked for your account.
                                  </Typography>
                                ) : null}
                              </div>
                            ) : null}
                            {isWorking && jobInfo.status === "Available" ? (
                              <Typography
                                sx={{
                                  color: "green",
                                  fontSize: "20px",
                                  marginBottom: "2%",
                                  textAlign: "center",
                                }}
                              >
                                <b>
                                  Apply is accepted !<br />
                                  Waiting for job start...
                                </b>
                              </Typography>
                            ) : null}
                            {isWorking && jobInfo.status === "In Progress" ? (
                              <Typography
                                sx={{
                                  color: "green",
                                  fontSize: "20px",
                                  marginBottom: "2%",
                                }}
                              >
                                <b>WORKING</b>
                              </Typography>
                            ) : null}
                            {isWaiting && jobInfo.status === "Available" ? (
                              <div>
                                <Typography
                                  sx={{
                                    color: "green",
                                    fontSize: "20px",
                                    marginBottom: "2%",
                                  }}
                                >
                                  <b>Apply sent ! Waiting...</b>
                                </Typography>
                                <Button
                                  variant="contained"
                                  color="warning"
                                  sx={{
                                    width: "100%",
                                    borderRadius: "15px",
                                    marginBottom: "2%",
                                  }}
                                  onClick={handleCancelApply}
                                >
                                  Cancel Apply
                                </Button>
                              </div>
                            ) : null}
                            {jobInfo.status === "Full" ? (
                              <Typography
                                sx={{
                                  color: "orange",
                                  fontSize: "25px",
                                  marginBottom: "2%",
                                }}
                              >
                                <b>JOB IS FULL</b>
                              </Typography>
                            ) : null}
                            {jobInfo.status === "Closed" ? (
                              <Typography
                                sx={{
                                  color: "red",
                                  fontSize: "25px",
                                  marginBottom: "2%",
                                }}
                              >
                                <b>JOB IS CLOSED</b>
                              </Typography>
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

                {ownerInfo && userData ? (
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
                        &nbsp;<b>Job Owner</b>{" "}
                        {userData.role === "Homeowner" &&
                        userData.id === jobInfo.owner_id
                          ? "- Your Job"
                          : null}
                      </Typography>
                      <CardContent>
                        <Grid container spacing={5}>
                          <Grid item xs={6} sm={3} md={2}>
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
                                to={`/user/${ownerInfo._id.$oid}`}
                              >
                                <CardMedia
                                  component="img"
                                  height="150"
                                  image={
                                    ownerInfo.avatar === ""
                                      ? avt_empty
                                      : ownerInfo.avatar
                                  }
                                  alt={ownerInfo.name}
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
                                    <b>{ownerInfo.name}</b>
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Box>
                  </>
                ) : null}
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
                                      card.avatar === ""
                                        ? avt_empty
                                        : card.avatar
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
                                  <Grid container>
                                    <Grid
                                      item
                                      xs={12}
                                      md={6}
                                      sx={{
                                        display: "flex",
                                        margin: "auto",
                                        marginBottom: isMd ? "" : "10px",
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: "90%",
                                          display: "flex",
                                          justifyContent: "center",
                                          margin: "auto",
                                        }}
                                      >
                                        <AcceptButton
                                          owner_id={userData.id}
                                          job_id={id}
                                          worker_id={card._id.$oid}
                                          block={userInfo.block}
                                        />
                                      </Box>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={12}
                                      md={6}
                                      sx={{ display: "flex", margin: "auto" }}
                                    >
                                      <Box
                                        sx={{
                                          width: "90%",
                                          display: "flex",
                                          justifyContent: "center",
                                          margin: "auto",
                                        }}
                                      >
                                        <RejectButton
                                          owner_id={userData.id}
                                          job_id={id}
                                          worker_id={card._id.$oid}
                                          block={userInfo.block}
                                        />
                                      </Box>
                                    </Grid>
                                  </Grid>
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
                                      card.avatar === ""
                                        ? avt_empty
                                        : card.avatar
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
                    {accept.length >= 1 &&
                    (jobInfo.status === "Available" ||
                      jobInfo.status === "Full") ? (
                      <StartJobButton
                        owner_id={userData.id}
                        job_id={id}
                        block={userInfo.block}
                      />
                    ) : null}
                    {jobInfo.status === "In Progress" ? (
                      <Button
                        variant="contained"
                        color="error"
                        disabled={userInfo.block ? true : false}
                        sx={{
                          width: isMd ? "15%" : "100px",
                          borderRadius: "15px",
                          marginBottom: isMd ? "2%" : "20px",
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
                    <Typography
                      variant="body1"
                      textAlign="center"
                      marginTop={2}
                    >
                      Are you sure you want to delete this job?
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      marginTop={4}
                    >
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
                    <Typography variant="h5" textAlign="center" marginTop={2}>
                      Leave a rating <StarIcon /> or feedback <RateReviewIcon />{" "}
                      for these worker(s) below
                    </Typography>
                    <CardContent>
                      <Grid container spacing={2}>
                        {accept.map((card, index) => (
                          <CardRating
                            card={card}
                            index={index}
                            key={index}
                            owner_id={userData.id}
                          />
                        ))}
                      </Grid>
                    </CardContent>
                    <Typography
                      id="place-book-modal"
                      variant="h5"
                      textAlign="center"
                      color="red"
                      marginTop={2}
                    >
                      <b>Are you sure you want to end this job?</b>
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      marginTop={4}
                    >
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

                <Modal
                  open={showCVModal}
                  onClose={handleCloseCVModal}
                  aria-labelledby="place-book-modal"
                  aria-describedby="place-book-modal-description"
                >
                  <Box sx={styles.modal}>
                    <Typography
                      id="place-book-modal"
                      variant="h5"
                      color="error"
                      textAlign="center"
                    >
                      <b>CV Creation Required</b>
                    </Typography>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      marginTop={2}
                    >
                      Please create CV before applying for a job!
                    </Typography>
                    <Stack
                      direction="row"
                      justifyContent="center"
                      marginTop={4}
                    >
                      <Button
                        variant="contained"
                        sx={styles.buttonRemove}
                        onClick={handleCloseCVModal}
                      >
                        Cancel
                      </Button>

                      <Button
                        variant="contained"
                        sx={styles.button}
                        onClick={handleCreateCV}
                      >
                        Create CV
                      </Button>
                    </Stack>
                  </Box>
                </Modal>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default JobInfo;
