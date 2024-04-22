import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, Button, Typography, Box } from "@mui/material";
import UserName from "./UserName";
import UserInfor from "./UserInfor";
import EmptyAvt from "./EmptyAvt";
import BigCard from "../../../components/BigCard/BigCard";

function Avt(prop) {
  const navigate = useNavigate();
  const handleMyJob = () => {
    navigate("/my-job");
  };
  return (
    <BigCard>
      <ThemeProvider theme={prop.finalTheme}>
        <Grid container sx={{ marginTop: "10%", marginBottom: "5%" }}>
          <Grid item xs={4}>
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
                    >
                      <img
                        alt={prop.avatarBase64}
                        src={prop.avatarBase64}
                        style={{
                          width: "55%",
                          height: "55%",
                          // marginTop: "20%",
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
                          width: "30%",
                          height: "auto",
                          // marginTop: "20%",
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
                          // marginTop: "20%",
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
                    <label
                      htmlFor="avatar-upload"
                      style={{
                        cursor: "pointer",
                        marginTop: "1%",
                        marginBottom: "5%",
                        padding: "12px 24px",
                        border: "2px solid #000",
                        borderRadius: "8px",
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
                            prop.setAvatarBase64(base64data);
                            prop.setFormData({
                              ...prop.formData,
                              avatar: prop.avatarBase64,
                            });
                          };
                          reader.readAsDataURL(selectedFile);
                        }}
                      />
                      Change Avatar
                    </label>
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
                      // marginTop: "20%",
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
          <Grid item xs={8}>
            <Grid item xs={12}>
              <UserName userInfo={prop.userInfo} />
            </Grid>
            <Grid item xs={12}>
              <UserInfor userInfo={prop.userInfo} />
            </Grid>
            {prop.userInfo.role === "Homeowner" ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    marginTop: "1%",
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ width: "15%", borderRadius: "15px" }}
                    onClick={handleMyJob}
                  >
                    My Job
                  </Button>
                </Box>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </ThemeProvider>
    </BigCard>
  );
}

export default Avt;
