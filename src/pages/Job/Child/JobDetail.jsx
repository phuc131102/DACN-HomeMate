import React from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import "./JobDetail.css";
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
          // border: "2px solid #000",
          borderRadius: "20px",
          color: "#000",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "16px",
          boxShadow: "0 7px 8px rgba(0, 0, 0, 0.4)",
          backgroundColor: "ghostwhite",
        }}
        className="JobDetailBig"
      >
        {/* Left Side */}
        <Grid item xs={6} sx={{ marginTop: "50px", marginBottom: "50px" }}>
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
                <Typography variant="caption">Job Name</Typography>
                <Typography variant="body1">{prop.jobInfo.name}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              {/* <TextField
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
              /> */}
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
                <Typography variant="caption">Salary</Typography>
                <Typography variant="body1">{prop.jobInfo.salary} VNĐ/hour</Typography>
              </Box>
            </Grid>
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
                <Typography variant="caption">Email</Typography>
                <Typography variant="body1">{prop.jobInfo.email}</Typography>
              </Box>
            </Grid>
            
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
                <Typography variant="caption">Phone Number</Typography>
                <Typography variant="body1">{prop.jobInfo.phone_num}</Typography>
              </Box>
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
                <Typography variant="caption">Address</Typography>
                <Typography variant="body1">{prop.jobInfo.address}</Typography>
              </Box>
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
                <Typography variant="caption">Date Time</Typography>
                <Typography variant="body1">{prop.jobInfo.datetime}</Typography>
              </Box>
            </Grid>
            <Grid item xs={4}>
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
                <Typography variant="caption">Required Worker</Typography>
                <Typography variant="body1">{prop.jobInfo.max_num}</Typography>
              </Box>
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
        {prop.jobInfo.status === "In Progress" &&
        prop.userData.role === "Homeowner" ? (
          <Typography sx={{ fontSize: 25 }} color="green" gutterBottom>
            <b>Status: IN PROGRESS</b>
          </Typography>
        ) : prop.jobInfo.status === "Closed" &&
          prop.userData.role === "Homeowner" ? (
          <Typography sx={{ fontSize: 25 }} color="red" gutterBottom>
            <b>Status: JOB IS CLOSED</b>
          </Typography>
        ) : prop.jobInfo.status === "Full" &&
          prop.userData.role === "Homeowner" ? (
          <Typography sx={{ fontSize: 25 }} color="orange" gutterBottom>
            <b>Status: JOB IS FULL</b>
          </Typography>
        ) : null}
      </Grid>
    </>
  );
}

export default JobDetail;
