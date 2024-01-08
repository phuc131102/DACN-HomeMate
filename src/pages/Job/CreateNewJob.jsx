import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Box, Typography } from "@mui/material";
import { DateTimePicker } from "react-rainbow-components";
import { create_job } from "../../services/jobAPI";
import Loading from "../../components/Loading/Loading";

const CreateJobPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    address: "",
    salary: "",
    email: "",
    phone_num: "",
    requirement: "",
  });
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");

  const handleChange = (e) => {
    // if (e.target.name === "date") {
    //   const formattedDate = dayjs(e.target.value).format("MM/DD/YYYY"); // Format the date string as needed
    //   setFormData({
    //     ...formData,
    //     [e.target.name]: formattedDate,
    //   });
    // } else {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // }
  };

  const handleDateTimeChange = (value) => {
    const formattedDateTime = formatDate(value);
    setFormData({
      ...formData,
      datetime: formattedDateTime,
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedFormData = {
      ...formData,
      image: avatarBase64,
      owner_id: userData.id,
    };
    console.log(updatedFormData);
    try {
      const response = await create_job(updatedFormData);
      if (response) {
        navigate("/job");
        console.log("User create job successfully:", response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          setError("All field is required.");
          setLoading(false);
        }
      }
      console.error("Create job failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: "1%",
          }}
        >
          <Typography variant="h3">New Job</Typography>
        </Box>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          width: "80vw",
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
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Job Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Phone Number"
                name="phone_num"
                value={formData.phone_num}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DateTimePicker
                // value={state.value}
                name="datetime"
                label="Date Time"
                value={formData.datetime}
                onChange={handleDateTimeChange}
                className="rainbow-m-around_small"
                hour24
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side - Image Upload */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {avatarBase64 ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt={avatarBase64}
                    src={avatarBase64}
                    style={{
                      width: "60%",
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
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
                ></Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <label
                  htmlFor="avatar-upload"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: "12px 24px",
                    border: "2px solid #000",
                    borderRadius: "20px",
                    background: "#fff",
                    color: "#000",
                    fontWeight: "bold",
                    textAlign: "center",
                    textTransform: "uppercase",
                    fontSize: "16px",
                    letterSpacing: "1px",
                    transition: "all 0.3s ease",
                  }}
                >
                  <input
                    id="avatar-upload"
                    style={{
                      display: "none",
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const selectedFile = e.target.files[0];
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        const base64data = reader.result;
                        setAvatarBase64(base64data);
                        setFormData({
                          ...formData,
                          image: avatarBase64,
                        });
                      };
                      reader.readAsDataURL(selectedFile);
                    }}
                  />
                  Upload image
                </label>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                multiline
                rows={8}
                label="Description"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                multiline
                rows={8}
                label="Requirement"
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
        {error && (
          <Typography variant="body2" color="error" align="center">
            {error}
          </Typography>
        )}
        <Grid item xs={12}>
          <Button sx={{ marginBottom: "1%" }} variant="contained" type="submit">
            Create Job
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateJobPage;
