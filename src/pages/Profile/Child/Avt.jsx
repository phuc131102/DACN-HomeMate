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

function Avt(prop) {
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
        avatar: base64data,
      });
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleClick = () => {
    prop.handleEdit();
    document.getElementById("avatar-upload").click();
  };
  return (
    <BigCard>
      <ThemeProvider theme={prop.finalTheme}>
        <Grid container sx={{ marginTop: "5%", marginBottom: "5%" }}>
          <Grid item xs={12} md={4}>
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
                  id="avatar-upload"
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
                      htmlFor="avatar-upload"
                    >
                      <img
                        alt={prop.avatarBase64}
                        src={prop.avatarBase64}
                        style={{
                          width: "55%",
                          height: "55%",
                          marginTop: "3%",
                          marginBottom: "5%",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </Box>
                  ) : prop.userInfo.avatar === "" ? (
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        alt="Kisspng computer"
                        src={prop.avtEmpty}
                        style={{
                          width: "55%",
                          height: "55%",
                          marginTop: "3%",
                          marginBottom: "5%",
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
                    >
                      <img
                        alt={prop.userInfo.avatar}
                        src={prop.userInfo.avatar}
                        style={{
                          width: "55%",
                          height: "55%",
                          marginTop: "3%",
                          marginBottom: "5%",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                        }}
                      />
                    </Box>
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
                    <Button
                      onClick={prop.handleUpdate}
                      variant="outlined"
                      sx={{
                        color: "black",
                        borderColor: "black",
                        "&:hover": {
                          backgroundColor: "rgba(110, 107, 107, 0.78)",
                          borderColor: "rgba(110, 107, 107, 0.78)",
                          boxShadow: "none",
                        },
                      }}
                    >
                      Change Avatar
                    </Button>
                  </Box>
                </Grid>
              </>
            ) : prop.userInfo.avatar !== "" ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img
                    alt={prop.userInfo.avatar}
                    src={prop.userInfo.avatar}
                    style={{
                      width: "55%",
                      height: "55%",
                      marginTop: "3%",
                      marginBottom: "5%",
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                </Box>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <EmptyAvt avtEmpty={prop.avtEmpty} />
              </Grid>
            )}
          </Grid>
          {/* <Box><Button onClick={prop.handleEdit}>dasd</Button></Box> */}
          <Grid item xs={12} md ={8} sx={{ display:isMd?"":"flex", flexDirection:isMd?"":"column",justifyContent: isMd?"":"center", alignItems:isMd?"":"center"}}>
            <Grid item xs={12}>
              <UserName userInfo={prop.userInfo} />
            </Grid>
            <Grid item xs={12}>
              <UserInfor userInfo={prop.userInfo} />
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </BigCard>
  );
}

export default Avt;
