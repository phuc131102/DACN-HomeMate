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
import {
  block_user,
  deleteUser,
  get_user_info,
  unblock_user,
} from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import avtEmpty from "../../assets/avt_empty.png";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

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
      width: 600,
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

  const handleBlockUser = async () => {
    try {
      const response = await block_user(id);
      navigate("/userlist");
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleUnblockUser = async () => {
    try {
      const response = await unblock_user(id);
      navigate("/userlist");
      console.log(response);
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

  const handleOpenModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
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
                          {userInfo.block ? (
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  textAlign: "center",
                                }}
                              >
                                <Typography
                                  sx={{ fontSize: "20px", color: "red" }}
                                >
                                  <b>USER IS BLOCKED</b>
                                </Typography>
                              </Box>
                            </Grid>
                          ) : null}
                          {userData.role === "Admin" ? (
                            <Grid item xs={12}>
                              <Box
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                }}
                              >
                                <Button
                                  variant="contained"
                                  color={
                                    !userInfo.block ? "warning" : "success"
                                  }
                                  sx={{
                                    width: "40%",
                                    borderRadius: "15px",
                                    margin: "auto",
                                  }}
                                  onClick={() => {
                                    handleOpenModal2();
                                  }}
                                >
                                  {!userInfo.block
                                    ? "Block User"
                                    : "Unblock User"}
                                </Button>
                                <Button
                                  variant="contained"
                                  color="error"
                                  sx={{
                                    width: "40%",
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
                          ) : null}
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
                <b>Confirm Deletion</b>
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

          <Modal
            open={showModal2}
            onClose={handleCloseModal2}
            aria-labelledby="place-book-modal"
            aria-describedby="place-book-modal-description"
          >
            <Box sx={styles.modal}>
              <Typography id="place-book-modal" variant="h5" textAlign="center">
                <b>{!userInfo.block ? "Confirm Block" : "Confirm Unblock"}</b>
              </Typography>
              {!userInfo.block && userInfo.role === "Homeowner" ? (
                <Typography variant="body1" textAlign="center" marginTop={2}>
                  This action will restrict <b>Homeowner</b> from{" "}
                  <b>creating new job</b>. <br />
                </Typography>
              ) : !userInfo.block && userInfo.role === "Worker" ? (
                <Typography variant="body1" textAlign="center" marginTop={2}>
                  This action will restrict <b>Worker</b> from{" "}
                  <b>applying job</b>. <br />
                </Typography>
              ) : null}
              <Typography variant="body1" textAlign="center" marginTop={2}>
                {!userInfo.block
                  ? "Are you sure you want to block this user?"
                  : "Are you sure you want to unblock this user?"}
              </Typography>
              <Stack direction="row" justifyContent="center" marginTop={4}>
                <Button
                  variant="contained"
                  sx={!userInfo.block ? styles.buttonRemove : styles.button}
                  onClick={() => {
                    !userInfo.block ? handleBlockUser() : handleUnblockUser();
                  }}
                >
                  {!userInfo.block ? "Block" : "Unblock"}
                </Button>

                <Button
                  variant="contained"
                  sx={!userInfo.block ? styles.button : styles.buttonRemove}
                  onClick={handleCloseModal2}
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
