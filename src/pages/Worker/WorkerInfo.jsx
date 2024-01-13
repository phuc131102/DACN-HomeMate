import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Grid, TextField, Typography, Box } from "@mui/material";
import { get_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import ViewCv from "../ViewCv/ViewCv";
import { get_cv_info } from "../../services/cvAPI";
import ComponentDivider from "../../components/ComponentDivider/ComponentDivider";

function WorkerInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cvInfo, setCvInfo] = useState(null);

  const finalTheme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) =>
            theme.unstable_sx({
              borderRadius: 20,
            }),
        },
      },
    },
  });

  const params = useParams();
  const id = params.id.split("/").pop();

  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_user_info(id);
          setUserInfo(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          try {
            const response = await get_cv_info(id);
            setCvInfo(response);
            console.log(response.data);
          } catch (error) {
            console.error("Error fetching cv information:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchUserInfo();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      {userInfo && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    position: "relative",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      margin: "auto",
                      marginBottom: "100px",
                    }}
                  >
                    <ThemeProvider theme={finalTheme}>
                      <>
                        <Grid item xs={12}>
                          {userInfo.avatar === "" ? (
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                alt="Kisspng computer"
                                src="https://www.homekeepermaidagency.com/wp-content/uploads/2019/10/male-avatar.png"
                                style={{
                                  width: "30%",
                                  height: "auto",
                                  marginTop: "20%",
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
                                alt={userInfo.avatar}
                                src={userInfo.avatar}
                                style={{
                                  width: "30%",
                                  height: "auto",
                                  marginTop: "20%",
                                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                                }}
                              />
                            </Box>
                          )}
                        </Grid>
                      </>

                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h3">
                            <b>{userInfo.name}</b>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography variant="h5">
                            Role: {userInfo.role}
                          </Typography>
                        </Box>
                      </Grid>
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "500px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    padding: "20px",
                    margin: "auto",
                    position: "sticky",
                    transform: "translateY(0%)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      width: "90%",
                      margin: "auto",
                      marginTop: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <ThemeProvider theme={finalTheme}>
                      <form>
                        <br />
                        <>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="User Name"
                              defaultValue={userInfo.name}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="Email"
                              defaultValue={userInfo.email}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="Address"
                              defaultValue={
                                userInfo.address === ""
                                  ? "N/A"
                                  : userInfo.address
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              InputProps={{
                                readOnly: true,
                                style: { color: "black" },
                              }}
                              sx={{
                                width: "100%",
                                [`& fieldset`]: { borderRadius: 8 },
                                marginBottom: "15px",
                              }}
                              label="Phone Number"
                              defaultValue={
                                userInfo.address === ""
                                  ? "N/A"
                                  : userInfo.phone_num
                              }
                            />
                          </Grid>
                        </>
                      </form>
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          {cvInfo && cvInfo.message === "CV not found" ? (
            <>
              <Grid container>
                <Grid item xs={12}>
                  {" "}
                  <ComponentDivider>CV</ComponentDivider>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      justifyContent: "center",
                      marginBottom: "50px",
                      marginTop: "10px",
                      display: "flex",
                    }}
                  >
                    No CV available.
                  </Box>
                </Grid>
              </Grid>
            </>
          ) : (
            <>
              <Grid container>
                <Grid item xs={12}>
                  {" "}
                  <ComponentDivider>CV</ComponentDivider>
                </Grid>
                <Grid container item xs={12}>
                  <Box
                    sx={{
                      width: "80%",
                      margin: "auto",
                      marginBottom: "50px",
                      marginTop: "10px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <Grid container>
                      <Grid item xs={12}>
                        <ViewCv cvinfo={cvInfo.data} />
                      </Grid>

                      <Grid container item xs={12} sx={{}}>
                        <Grid item xs={8}></Grid>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default WorkerInfo;
