import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Grid,
  TextField,
  Typography,
  Box,
  Button,
  Modal,
  Stack,
} from "@mui/material";
import { deleteUser, get_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import avtEmpty from "../../assets/avt_empty.png";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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

  const styles = {
    button: {
      backgroundColor: "green",
      color: "#fff",
      fontWeight: 600,
      borderRadius: 15,
      maxWidth: "500px",
      marginRight: "10px",
      minWidth: "150px",
      padding: "5px 10px",
      fontSize: "1.2rem",
    },
    buttonRemove: {
      backgroundColor: "red",
      color: "#fff",
      fontWeight: 600,
      borderRadius: 15,
      maxWidth: "500px",
      marginRight: "10px",
      minWidth: "150px",
      padding: "5px 10px",
      fontSize: "1.2rem",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };

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
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [id]);

  const handleDeleteUser = async (id) => {
    try {
      const deletionMessage = await deleteUser(id);
      navigate("/userlist");
      console.log(deletionMessage);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
                                src={avtEmpty}
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
                          <Grid item xs={12}>
                            <Box
                              sx={{
                                width: "100%",
                                display: "flex",
                              }}
                            >
                              <Button
                                variant="contained"
                                color="error"
                                sx={{
                                  width: "30%",
                                  borderRadius: "15px",
                                  margin: "auto",
                                }}
                                onClick={() => {
                                  handleOpenModal();
                                }}
                              >
                                Delete User
                              </Button>
                            </Box>
                          </Grid>
                        </>
                      </form>
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby="place-book-modal"
            aria-describedby="place-book-modal-description"
          >
            <Box sx={styles.modal}>
              <Typography id="place-book-modal" variant="h5" textAlign="center">
                Confirm Deletion
              </Typography>
              <Typography variant="body1" textAlign="center" marginTop={2}>
                Are you sure you want to delete this user?
              </Typography>
              <Stack direction="row" justifyContent="center" marginTop={4}>
                <Button
                  variant="contained"
                  sx={styles.buttonRemove}
                  onClick={() => {
                    handleDeleteUser(id);
                  }}
                >
                  Delete
                </Button>

                <Button
                  variant="contained"
                  sx={styles.button}
                  onClick={handleCloseModal}
                >
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}

export default UserInfo;
