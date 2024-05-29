import React from "react";
import {
  Grid,
  TextField,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import "./JobDetail.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HouseIcon from "@mui/icons-material/House";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DescriptionIcon from "@mui/icons-material/Description";
import ConstructionIcon from "@mui/icons-material/Construction";
import jobEmpty from "../../../assets/job_empty.png";

function JobDetail(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Grid
        container
        // spacing={2}
        sx={{
          width: isMd ? "70%" : "90%",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "1%",
          marginBottom: "2%",
          borderRadius: "20px",
          color: "#000",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "16px",
          boxShadow: "0 7px 8px rgba(0, 0, 0, 0.4)",
          backgroundColor: "ghostwhite",
          paddingLeft: "16px",
          paddingRight: "16px",
        }}
        className="JobDetailBig"
      >
        {/* Left Side */}
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "left",
            }}
          >
            <Typography variant="h3" sx={{ textAlign: "center" }}>
              <b>{prop.jobInfo.name}</b>
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ marginTop: "50px", marginBottom: "50px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AttachMoneyIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Salary</Typography>
                </Box>
                <Typography variant="body1">
                  {prop.jobInfo.salary} VNĐ/hour
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmailIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Email</Typography>
                </Box>
                <Typography variant="body1">{prop.jobInfo.email}</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalPhoneIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Phone Number</Typography>
                </Box>
                <Typography variant="body1">
                  {prop.jobInfo.phone_num}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PersonIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Quantity</Typography>
                </Box>
                <Typography variant="body1">{prop.jobInfo.max_num}</Typography>
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
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HouseIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Address</Typography>
                </Box>
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
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <CleaningServicesIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Skill</Typography>
                </Box>
                <Typography variant="body1">
                  {prop.chooseSkill.join(", ")}
                </Typography>
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
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccessTimeIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Date Time</Typography>
                </Box>
                <Typography variant="body1">{prop.jobInfo.datetime}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side - Image Upload */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{ marginTop: isMd ? "30px" : "", marginBottom: "30px" }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              alt={prop.jobInfo.name}
              src={prop.jobInfo.image === "" ? jobEmpty : prop.jobInfo.image}
              style={
                isMd
                  ? {
                      width: "500px",
                      height: "300px",
                      display: "flex",
                      justifyContent: "center",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    }
                  : {
                      width: "300px",
                      height: "180px",
                      display: "flex",
                      justifyContent: "center",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    }
              }
            />
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: "50px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DescriptionIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Description</Typography>
                </Box>
                <Typography variant="body1">{prop.jobInfo.desc}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  textAlign: "left",
                  border: "1px solid black",
                  borderRadius: "10px",
                  padding: "5px",
                  textAlign: "justify",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <ConstructionIcon fontSize="small" />
                  &nbsp;
                  <Typography variant="h5">Requirement</Typography>
                </Box>
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
