import React, { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import { DatePicker } from "react-rainbow-components";

const CreateJobPage = () => {
  const [jobInfo, setJobInfo] = useState({
    jobname: "",
    address: "",
    email: "",
    phoneNumber: "",
    dateTime: "",
    salary: "",
    description: "",
    requirement: "",
  });
  const [avatarBase64, setAvatarBase64] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setJobInfo({ ...jobInfo, [name]: value });
  };

  const [date, setDate] = useState(null);

  function onChange(date) {
    setDate(date);
  }
  const updatedJobInfo = {
    ...jobInfo,
    avatar: avatarBase64,
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(jobInfo);
    setJobInfo({
      jobname: "",
      address: "",
      email: "",
      phoneNumber: "",
      dateTime: null,
      salary: "",
      description: "",
      requirement: "",
      image: null,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
                name="jobname"
                value={jobInfo.jobname}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Address"
                name="address"
                value={jobInfo.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Email"
                name="email"
                value={jobInfo.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={jobInfo.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                fullWidth
                label="Salary"
                name="salary"
                value={jobInfo.salary}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DatePicker
                id="datePicker-1"
                value={date}
                placeholder="Date and Time"
                name="dateTime"
                formatStyle="large"
                onChange={onChange}
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
                        setJobInfo({
                          ...jobInfo,
                          avatar: avatarBase64,
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
                name="description"
                value={jobInfo.description}
                onChange={handleInputChange}
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
                value={jobInfo.requirement}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
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
