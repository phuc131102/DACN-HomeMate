import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  TextField,
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  InputAdornment,
} from "@mui/material";
import { DateTimePicker } from "react-rainbow-components";
import { deleteJob, get_job_info, update_job } from "../../services/jobAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";

function JobInfo() {
  const [error, setError] = useState("");
  const [jobInfo, setJobInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");
  const [showModal, setShowModal] = useState(false);

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

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchJobInfo = async () => {
        setLoading(true);
        try {
          const response = await get_job_info(id);
          setJobInfo(response);
        } catch (error) {
          console.error("Error fetching job information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchJobInfo();
    }
  }, [id]);

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

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
    if (!editMode) {
      setEditedValues(jobInfo);
    }
  };

  const handleCancelEditMode = () => {
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
              <Grid
                container
                spacing={2}
                sx={{
                  width: "80%",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  marginTop: "1%",
                  marginBottom: "5%",
                  border: "2px solid #000",
                  borderRadius: "20px",
                  background: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "16px",
                }}
              >
                {/* Left Side */}
                <Grid
                  item
                  xs={6}
                  sx={{ marginTop: "50px", marginBottom: "50px" }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        fullWidth
                        required={editMode}
                        label="Job Name"
                        name="name"
                        value={editMode ? editedValues.name : jobInfo.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                          endAdornment: (
                            <InputAdornment position="end">
                              VNĐ / hour
                            </InputAdornment>
                          ),
                        }}
                        required={editMode}
                        type="number"
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        fullWidth
                        label="Salary"
                        name="salary"
                        value={editMode ? editedValues.salary : jobInfo.salary}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        required={editMode}
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={editMode ? editedValues.email : jobInfo.email}
                        onChange={handleInputChange}
                        error={
                          editMode
                            ? !!editedValues.email &&
                              !/\S+@\S+\.\S+/.test(editedValues.email)
                            : null
                        }
                        helperText={
                          editMode
                            ? !!editedValues.email &&
                              !/\S+@\S+\.\S+/.test(editedValues.email)
                              ? "Please enter a valid email address."
                              : ""
                            : null
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        type="number"
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        required={editMode}
                        fullWidth
                        label="Phone Number"
                        name="phone_num"
                        value={
                          editMode ? editedValues.phone_num : jobInfo.phone_num
                        }
                        onChange={handleInputChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        required={editMode}
                        fullWidth
                        label="Address"
                        name="address"
                        value={
                          editMode ? editedValues.address : jobInfo.address
                        }
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      {editMode ? (
                        <DateTimePicker
                          name="datetime"
                          value={editedValues.datetime}
                          onChange={handleDateTimeChange}
                          className="rainbow-m-around_small"
                          hour24
                          placeholder="Date/Time *"
                        />
                      ) : (
                        <TextField
                          InputProps={{
                            readOnly: true,
                            style: { color: "black" },
                          }}
                          sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                          variant="standard"
                          fullWidth
                          label="Date Time"
                          value={jobInfo.datetime}
                        />
                      )}
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        type="number"
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        required={editMode}
                        fullWidth
                        label="Required Worker"
                        name="max_num"
                        value={
                          editMode ? editedValues.max_num : jobInfo.max_num
                        }
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>

                {/* Right Side - Image Upload */}
                <Grid item xs={6} sx={{ marginTop: "50px" }}>
                  {jobInfo.image === "" ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    ></Box>
                  ) : (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt={jobInfo.name}
                        src={jobInfo.image}
                        style={{
                          width: "60%",
                          height: "auto",
                          display: "flex",
                          justifyContent: "center",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12} sx={{ marginBottom: "50px" }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        sx={{
                          [`& fieldset`]: {
                            borderRadius: 8,
                          },
                          "& .MuiInputLabel-asterisk": {
                            color: "red",
                          },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        required={editMode}
                        fullWidth
                        multiline
                        label="Description"
                        name="desc"
                        value={editMode ? editedValues.desc : jobInfo.desc}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={6} sx={{ pr: 2 }}>
                      <TextField
                        InputProps={{
                          readOnly: !editMode,
                          style: { color: "black" },
                        }}
                        sx={{
                          mb: "1%",
                          [`& fieldset`]: { borderRadius: 8 },
                        }}
                        variant={editMode ? "outlined" : "standard"}
                        fullWidth
                        multiline
                        label="Requirement"
                        name="requirement"
                        value={
                          editMode
                            ? editedValues.requirement
                            : jobInfo.requirement === ""
                            ? "No requirement."
                            : jobInfo.requirement
                        }
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
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
                      // handleCloseModal();
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
          </>
        )}
      </div>
    </>
  );
}

export default JobInfo;
