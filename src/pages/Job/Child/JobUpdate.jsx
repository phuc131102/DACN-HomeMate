import React from "react";
import {
  Grid,
  TextField,
  Box,
  Button,
  InputAdornment,
} from "@mui/material";
import { DateTimePicker } from "react-rainbow-components";
import JobFilter from "./Job_filter";

function JobUpdate(prop) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        prop.handleInputChange({
          target: {
            name: "image",
            value: upload.target.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

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
        <Grid item xs={6} sx={{ marginTop: "50px", marginBottom: "50px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                InputProps={{
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
                variant={"outlined"}
                fullWidth
                required={prop.editMode}
                label="Job Name"
                name="name"
                value={prop.editedValues.name}
                onChange={prop.handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
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
                variant={"outlined"}
                fullWidth
                label="Salary"
                name="salary"
                value={prop.editedValues.salary}
                onChange={prop.handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
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
                variant={"outlined"}
                required={prop.editMode}
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={prop.editedValues.email}
                onChange={prop.handleInputChange}
                error={
                  !!prop.editedValues.email &&
                  !/\S+@\S+\.\S+/.test(prop.editedValues.email)
                }
                helperText={
                  !!prop.editedValues.email &&
                  !/\S+@\S+\.\S+/.test(prop.editedValues.email)
                    ? "Please enter a valid email address."
                    : ""
                }
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                InputProps={{
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
                variant={"outlined"}
                required={prop.editMode}
                fullWidth
                label="Phone Number"
                name="phone_num"
                value={prop.editedValues.phone_num}
                onChange={prop.handleInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                InputProps={{
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
                variant="outlined"
                required={prop.editMode}
                fullWidth
                label="Address"
                name="address"
                value={prop.editedValues.address}
                onChange={prop.handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <JobFilter
                option={prop.skills}
                chooseOption={prop.chooseSkill}
                setChooseOption={prop.setChooseSkill}
                label="Skill"
              />
            </Grid>
            <Grid item xs={8}>
              <DateTimePicker
                name="datetime"
                value={prop.editedValues.datetime}
                onChange={prop.handleDateTimeChange}
                className="rainbow-m-around_small"
                hour24
                placeholder="Date/Time *"
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                InputProps={{
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
                variant={"outlined"}
                required={prop.editMode}
                fullWidth
                label="Required Worker"
                name="max_num"
                value={prop.editedValues.max_num}
                onChange={prop.handleInputChange}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Side - Image Upload */}
        <Grid item xs={6} sx={{ marginTop: "50px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {prop.editedValues.image ? (
              <img
                alt={prop.editedValues.name}
                src={prop.editedValues.image}
                style={{
                  width: "60%",
                  height: "auto",
                  display: "flex",
                  justifyContent: "center",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  marginBottom: "10px",
                }}
              />
            ) : null}
            {prop.editMode && (
              <Button
                variant="contained"
                component="label"
                sx={{ width: "60%" }}
              >
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageChange}
                />
              </Button>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sx={{ marginBottom: "50px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ width: "100%" }}>
                <TextField
                  InputProps={{
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
                  variant="outlined"
                  required={prop.editMode}
                  fullWidth
                  multiline
                  label="Description"
                  name="desc"
                  value={prop.editedValues.desc}
                  onChange={prop.handleInputChange}
                />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ pr: 2 }}>
              <Box sx={{ width: "100%" }}>
                <TextField
                  InputProps={{
                    style: { color: "black" },
                  }}
                  sx={{
                    mb: "1%",
                    [`& fieldset`]: { borderRadius: 8,
                  },
                }}
                  variant="outlined"
                  fullWidth
                  multiline
                  label="Requirement"
                  name="requirement"
                  value={prop.editedValues.requirement}
                  onChange={prop.handleInputChange}
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default JobUpdate;
