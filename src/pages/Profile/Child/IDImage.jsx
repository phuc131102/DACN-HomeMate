import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Button, Typography, Box } from "@mui/material";
import UserName from "./UserName";
import UserInfor from "./UserInfor";
import EmptyAvt from "./EmptyAvt";
import BigCard from "../../../components/BigCard/BigCard";
import "./AvtEdit.css";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function IDImage(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      prop.setAvatarBase64(base64data);
      prop.setFormData({
        ...prop.formData,
        cccd_image: base64data,
      });
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleClick = () => {
    prop.handleEdit();
    document.getElementById("cccd-upload").click();
  };
  return (
    <BigCard>
      <ThemeProvider theme={prop.finalTheme}>
        <Grid container sx={{ marginTop: "5%", marginBottom: "5%" }}>
          <Grid item xs={12}>
            <Box className="hero-title">
              <Box
                className="orange-circle"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(110, 107, 107, 0.78)",
                    borderColor: "#0062cc",
                    boxShadow: "none",
                  },
                }}
                onClick={handleClick}
              >
                <CameraAltIcon fontSize="large" />
                <input
                  id="cccd-upload"
                  style={{
                    display: "none",
                  }}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
              </Box>
            </Box>
            {prop.editing ? (
              <>
                <Grid item xs={12}>
                  {prop.avatarBase64 ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                      htmlFor="cccd-upload"
                    >
                      <img
                        alt={prop.avatarBase64}
                        src={prop.avatarBase64}
                        style={{
                          width: "500px",
                          border: "5px solid black",
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
                        alt={prop.userInfo.name}
                        src={prop.userInfo.cccd_image}
                        style={{
                          width: "500px",
                          border: "5px solid black",
                        }}
                      />
                    </Box>
                  )}
                </Grid>
              </>
            ) : (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt={prop.userInfo.name}
                    src={prop.userInfo.cccd_image}
                    style={{
                      width: "500px",
                      border: "5px solid black",
                    }}
                  />
                </Box>
              </Grid>
            )}
          </Grid>
        </Grid>
      </ThemeProvider>
    </BigCard>
  );
}

export default IDImage;
