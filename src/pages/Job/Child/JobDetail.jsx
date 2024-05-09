import React from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";

function JobDetail(prop) {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          width: "80%",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "1%",
          marginBottom: "2%",
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
        <Grid item xs={6} sx={{ marginTop: "50px", marginBottom: "50px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  readOnly: !prop.editMode,
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
                variant={prop.editMode ? "outlined" : "standard"}
                fullWidth
                required={prop.editMode}
                label="Job Name"
                name="name"
                value={prop.jobInfo.name}
                // onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  readOnly: !prop.editMode,
                  style: { color: "black" },
                  endAdornment: (
                    <InputAdornment position="end">VNĐ / hour</InputAdornment>
                  ),
                }}
                required={prop.editMode}
                type="number"
                sx={{
                  [`& fieldset`]: {
                    borderRadius: 8,
                  },
                  "& .MuiInputLabel-asterisk": {
                    color: "red",
                  },
                }}
                variant={prop.editMode ? "outlined" : "standard"}
                fullWidth
                label="Salary"
                name="salary"
                value={prop.jobInfo.salary}
                // onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  readOnly: !prop.editMode,
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
                variant={prop.editMode ? "outlined" : "standard"}
                required={prop.editMode}
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={prop.jobInfo.email}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
                  readOnly: !prop.editMode,
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
                variant={prop.editMode ? "outlined" : "standard"}
                required={prop.editMode}
                fullWidth
                label="Phone Number"
                name="phone_num"
                value={prop.jobInfo.phone_num}
                // onChange={handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                InputProps={{
                  readOnly: !prop.editMode,
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
                variant={prop.editMode ? "outlined" : "standard"}
                required={prop.editMode}
                fullWidth
                label="Address"
                name="address"
                value={prop.jobInfo.address}
                // onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography variant="caption">Require Skill</Typography>
                <Typography variant="body1">
                  {prop.chooseSkill.join(", ")}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <TextField
                InputProps={{
                  readOnly: true,
                  style: { color: "black" },
                }}
                sx={{ [`& fieldset`]: { borderRadius: 8 } }}
                variant="standard"
                fullWidth
                label="Date Time"
                value={prop.jobInfo.datetime}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                InputProps={{
                  readOnly: !prop.editMode,
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
                variant={prop.editMode ? "outlined" : "standard"}
                required={prop.editMode}
                fullWidth
                label="Required Worker"
                name="max_num"
                value={prop.jobInfo.max_num}
                // onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side - Image Upload */}
        <Grid item xs={6} sx={{ marginTop: "50px" }}>
          {prop.jobInfo.image === "" ? (
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
                alt={prop.jobInfo.name}
                src={prop.jobInfo.image}
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
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography variant="caption">Description</Typography>
                <Typography variant="body1">{prop.jobInfo.desc}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ pr: 2 }}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  borderBottom: "1px solid black",
                }}
              >
                <Typography variant="caption">Requirement</Typography>
                <Typography variant="body1">
                  {prop.jobInfo.requirement === ""
                    ? "No requirement."
                    : prop.jobInfo.requirement}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {prop.jobInfo.status === "In Progress" ? (
          <Typography sx={{ fontSize: 25 }} color="green" gutterBottom>
            <b>Status: In Progress</b>
          </Typography>
        ) : prop.jobInfo.status === "Closed" ? (
          <Typography sx={{ fontSize: 25 }} color="red" gutterBottom>
            <b>Status: Job is Closed</b>
          </Typography>
        ) : prop.jobInfo.status === "Full" ? (
          <Typography sx={{ fontSize: 25 }} color="orange" gutterBottom>
            <b>Status: Job is Full</b>
          </Typography>
        ) : null}
      </Grid>
    </>
  );
}

export default JobDetail;
