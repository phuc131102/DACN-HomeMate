import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Grid,
  Typography,
  Box,
  Button,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  block_user,
  deleteUser,
  report_user,
  unblock_user,
} from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useParams } from "react-router-dom";
import ViewCv from "../ViewCv/ViewCv";
import { get_cv_info } from "../../services/cvAPI";
import ComponentDivider from "../../components/ComponentDivider/ComponentDivider";
import avtEmpty from "../../assets/avt_empty.png";
import Avt from "./Child/Avt";
import LeftSide from "./Child/LeftSide";
import Rate from "./Child/Rating";
import BigCard from "../../components/BigCard/BigCard";
import MyJob from "../Profile/Child/Myjob";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useUserInfo from "../../utils/userUtils/useUserInfo";
import {
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import FlagIcon from "@mui/icons-material/Flag";
import BlockIcon from "@mui/icons-material/Block";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import DeleteIcon from "@mui/icons-material/Delete";
import { message } from "antd";
import { useChatStore } from "../../lib/chatStore";
function WorkerInfo() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [cvinfo, setCvInfo] = useState({});
  const { ChangeChat, user } = useChatStore();
  const { chat, setChat } = useState([]);
  const [newValue, setNewValue] = useState("");
  const { userInfo: currentUserInfo } = useUserInfo(userData?.id);
  console.log(currentUserInfo);

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
  const { userInfo } = useUserInfo(id);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id && id) {
      const fetchData = async () => {
        try {
          const response = await get_cv_info(id);
          setCvInfo(response);
        } catch (error) {
          console.error("Error fetching cv information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [userData, id]);

  useEffect(() => {
    if (id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_cv_info(id);
          setCvInfo(response);
        } catch (error) {
          console.error("Error fetching cv information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [id]);

  const handleAddNewContact = () => {
    const chatRef = collection(db, "messages");
    const userChatRef = collection(db, "contacts");
    let filterItem = [];
    const unSub = onSnapshot(doc(db, "contacts", userData.id), (res) => {
      const arrayMes = res.data();
      // setChat(arrayMes.chat.filter((item) => item.receiverId === id));
      filterItem = arrayMes.chat.filter((item) => item.receiverId === id);
      if (filterItem.length > 0) {
        const mergedArray = { ...filterItem, ...userInfo }; // Merge properties of item1 and item2
        ChangeChat(filterItem[0].chatId, mergedArray);
        navigate("/chat");
      } else {
        const createUser = async () => {
          try {
            // console.log("cay vkl");
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
              createAt: serverTimestamp(),
              message: [],
            });

            await updateDoc(doc(userChatRef, userData.id), {
              chat: arrayUnion({
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: id,
                updateAt: Date.now(),
              }),
            });
            await updateDoc(doc(userChatRef, id), {
              chat: arrayUnion({
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: userData.id,
                updateAt: Date.now(),
              }),
            });
            const mergedArray = {
              ...{
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: userData.id,
                updateAt: Date.now(),
              },
              ...userInfo,
            };
            console.log(newChatRef.id);
            ChangeChat(newChatRef.id, mergedArray);
          } catch (err) {
            console.log(err);
          }
        };
        createUser();
      }
    });

    // navigate("/chat");
  };

  const handleDeleteUser = async (id) => {
    try {
      const deletionMessage = await deleteUser(id);
      navigate("/admin/2");
      console.log(deletionMessage);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleBlockUser = async () => {
    try {
      const response = await block_user(id);
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleUnblockUser = async () => {
    try {
      const response = await unblock_user(id);
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleChange = (event) => {
    setNewValue(event.target.value);
  };

  const handleReportUser = async () => {
    const data = {
      userId: userData.id,
      reason: newValue,
    };
    try {
      const response = await report_user(id, data);
      if (response) {
        setShowReportModal(false);
        console.log(response);
      }
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

  const handleOpenReportModal = () => {
    setShowReportModal(true);
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
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
              width: isMd ? "60%" : "100%",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <Grid
              container
              sx={{
                margin: "auto",
                marginBottom: "20px",
              }}
            >
              <BigCard>
                <ThemeProvider theme={finalTheme}>
                  <Grid container sx={{ marginTop: "10%", marginBottom: "5%" }}>
                    <Grid item xs={12} md={4}>
                      <>
                        <Avt avtEmpty={avtEmpty} userInfo={userInfo} />
                      </>
                    </Grid>
                    <Grid item container xs={12} md={8}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: isMd ? "flex-start" : "center",
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
                            justifyContent: isMd ? "flex-start" : "center",
                            marginBottom: "20px",
                          }}
                        >
                          <Typography variant="h4">
                            Role: {userInfo.role}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                        <Box
                          sx={{
                            width: "100%",
                            display: isMd ? "" : "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={handleAddNewContact}
                            sx={{ borderRadius: "20px" }}
                            disabled={currentUserInfo?.block ? true : false}
                          >
                            <ChatBubbleIcon />
                            &nbsp; Message
                          </Button>
                          {userData.role !== "Admin" ? (
                            <Button
                              variant="contained"
                              color="error"
                              onClick={handleOpenReportModal}
                              sx={{ borderRadius: "20px", marginLeft: "10px" }}
                              disabled={currentUserInfo?.block ? true : false}
                            >
                              <FlagIcon /> &nbsp;Report
                            </Button>
                          ) : null}
                        </Box>
                      </Grid>

                      {userData.role === "Admin" &&
                      userInfo.role !== "Admin" ? (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              width: "100%",
                              display: isMd ? "" : "flex",
                              justifyContent: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <Button
                              variant="contained"
                              color={!userInfo.block ? "warning" : "success"}
                              sx={{
                                borderRadius: "20px",
                              }}
                              onClick={() => {
                                handleOpenModal2();
                              }}
                            >
                              {!userInfo.block ? (
                                <BlockIcon />
                              ) : (
                                <LockOpenIcon />
                              )}
                              &nbsp;
                              {!userInfo.block ? "Block User" : "Unblock User"}
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              sx={{
                                borderRadius: "20px",
                                marginLeft: "10px",
                              }}
                              onClick={() => {
                                handleOpenModal();
                              }}
                            >
                              <DeleteIcon />
                              &nbsp;Delete User
                            </Button>
                          </Box>
                        </Grid>
                      ) : null}
                      {userInfo.block && userData.role === "Admin" ? (
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                color: "red",
                                textAlign: isMd ? "" : "center",
                              }}
                            >
                              <b>USER IS BLOCKED</b>
                            </Typography>
                          </Box>
                        </Grid>
                      ) : null}
                      {userData.role === "Homeowner" &&
                      userInfo.role === "Worker" ? (
                        <Grid item xs={12}>
                          <Box>
                            <Typography
                              sx={{
                                fontSize: "20px",
                                textAlign: isMd ? "" : "center",
                              }}
                            >
                              <b>
                                Worker Status:{" "}
                                <span
                                  style={
                                    userInfo.status === "Available"
                                      ? { color: "green" }
                                      : { color: "orange" }
                                  }
                                >
                                  {userInfo.status}
                                </span>
                              </b>
                            </Typography>
                          </Box>
                        </Grid>
                      ) : null}
                    </Grid>
                  </Grid>
                </ThemeProvider>
              </BigCard>
            </Grid>
            <Grid container sx={{ marginBottom: "20px" }} spacing={3}>
              <Grid item xs={12} md={4}>
                <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                  <LeftSide profile={userInfo} />
                </Grid>
                {userInfo.rating ? (
                  <Grid item xs={12}>
                    <Rate rating={userInfo.rating} />
                  </Grid>
                ) : null}
              </Grid>
              <Grid item xs={12} md={8}>
                <Box sx={{ marginBottom: "20px" }}>
                  <BigCard>
                    <Grid container>
                      <Grid container item xs={12}>
                        {userInfo.role === "Worker" ? (
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "right",
                            }}
                          >
                            {cvinfo.message === "CV not found" ? (
                              <>
                                <Grid container>
                                  <Grid item xs={12} sx={{ marginTop: "15px" }}>
                                    <ComponentDivider>CV</ComponentDivider>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Box
                                      sx={{
                                        justifyContent: "center",
                                        marginBottom: "50px",
                                        marginTop: "15px",
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
                                  <Grid item xs={12} sx={{ marginTop: "15px" }}>
                                    <ComponentDivider>CV</ComponentDivider>
                                  </Grid>

                                  <Grid item xs={12}>
                                    <ViewCv cvinfo={cvinfo.data} />
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </Box>
                        ) : userInfo.role === "Homeowner" ? (
                          <Grid container>
                            <Grid item xs={12} sx={{ marginTop: "15px" }}>
                              <ComponentDivider>Job</ComponentDivider>
                            </Grid>
                            <Box
                              sx={{
                                width: "90%",
                                margin: "auto",
                                marginTop: "10px",
                                marginBottom: "10px",
                              }}
                            >
                              <MyJob id={id} />
                            </Box>
                          </Grid>
                        ) : (
                          <></>
                        )}
                      </Grid>
                    </Grid>
                  </BigCard>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
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
      <Modal
        open={showReportModal}
        onClose={handleCloseReportModal}
        aria-labelledby="place-book-modal"
        aria-describedby="place-book-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="place-book-modal" variant="h5" textAlign="center">
            Confirm Report
          </Typography>
          <Typography variant="body1" textAlign="center" marginTop={2}>
            Are you sure you want to report this user?
            <br /> Please fill in the reason below:
          </Typography>
          <TextField
            id="outlined-basic"
            sx={{
              width: "100%",
              [`& fieldset`]: { borderRadius: 8 },
              marginTop: "30px",
              marginBottom: "15px",
            }}
            variant="outlined"
            label="Please fill in the report reason..."
            name="reason"
            fullWidth
            multiline
            required
            rows={8}
            value={newValue}
            onChange={handleChange}
          />
          <Stack direction="row" justifyContent="center" marginTop={4}>
            <Button
              variant="contained"
              sx={styles.buttonRemove}
              onClick={handleReportUser}
            >
              Report
            </Button>

            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleCloseReportModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
      {userInfo ? (
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
                <b>creating new job, updating, deleting exist job, etc...</b>.{" "}
                <br />
              </Typography>
            ) : !userInfo.block && userInfo.role === "Worker" ? (
              <Typography variant="body1" textAlign="center" marginTop={2}>
                This action will restrict <b>Worker</b> from{" "}
                <b>applying job.</b>
                <br />
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
      ) : null}
    </div>
  );
}

export default WorkerInfo;
