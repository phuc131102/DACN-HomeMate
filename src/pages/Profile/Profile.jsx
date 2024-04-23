import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Avt from "./Child/Avt";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { get_user_info, update_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import ComponentDivider from "../../components/ComponentDivider/ComponentDivider";
import ViewCv from "../ViewCv/ViewCv";
import { get_cv_info, delete_cv } from "../../services/cvAPI";
import avtEmpty from "../../assets/avt_empty.png";
import LeftSide from "./Child/LeftSide";
import Rating from "./Child/Rating";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileCv from "./Child/ProfileCv";
import BigCard from "../../components/BigCard/BigCard";
import MyJob from "./Child/Myjob";

function Profile() {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [value, setValue] = useState("1");
  //
  const [haveCv, setHaveCv] = useState(false);
  const [cvinfo, setCvInfo] = useState({});
  useEffect(() => {
    if (userData && userData.id) {
      const fetchCvInfo = async () => {
        setLoading(true);
        try {
          const response = await get_cv_info(userData.id);
          setCvInfo(response);
          // console.log(response.data);
        } catch (error) {
          console.error("Error fetching cv information:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchCvInfo();
    }
  }, [userData]);
  //
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    address: "",
    phone_num: "",
  });
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setFormData((prevData) => ({
        ...prevData,
        id: parsedUserData.id || "",
      }));
    }
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }
    if (!validatePhonenum(formData.phone_num)) {
      setError("Invalid phone number format.");
      setLoading(false);
      return;
    }

    const updatedFormData = {
      ...formData,
      avatar: avatarBase64,
    };

    const finalData = {};
    finalData.id = updatedFormData.id;
    if (updatedFormData.name !== "") {
      finalData.name = updatedFormData.name;
    }

    if (updatedFormData.email !== "") {
      finalData.email = updatedFormData.email;
    }

    if (updatedFormData.password !== "") {
      finalData.password = updatedFormData.password;
    }

    if (updatedFormData.address !== "") {
      finalData.address = updatedFormData.address;
    }

    if (updatedFormData.phone_num !== "") {
      finalData.phone_num = updatedFormData.phone_num;
    }

    if (updatedFormData.avatar !== "") {
      finalData.avatar = updatedFormData.avatar;
    }
    console.log(finalData);

    try {
      const response = await update_user_info(finalData);

      if (response) {
        console.log("User information updated successfully");

        setEditing(false);
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 409) {
          setError("New email has been used.");
          setLoading(false);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCvDelete = async (e) => {
    setLoading(true);
    try {
      const response = await delete_cv(userData.id);
      if (response) {
        console.log("delete cv");
        window.location.reload();
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          setError("Wrong user");
          setLoading(false);
        }
        if (status === 405) {
          setError("Invalid request method");
          setLoading(false);
        }
      }
    } finally {
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  const validateEmail = (email) => {
    const emailPattern = /^\s*$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhonenum = (phone_num) => {
    const phonePattern = /^\d*$/;
    return phonePattern.test(phone_num);
  };

  const [editing, setEditing] = useState(false);

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

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_user_info(userData.id);
          setUserInfo(response);
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          try {
            const response = await get_cv_info(userData.id);
            setCvInfo(response);
            // console.log(response.data);
          } catch (error) {
            console.error("Error fetching cv information:", error);
          } finally {
            setLoading(false);
          }
        }
      };
      fetchUserInfo();
    }
  }, [userData]);
  // useEffect(() => {
  //   if (userData && userData.id) {
  //     const fetchCvInfo = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await get_cv_info(userData.id);
  //         setCvInfo(response);
  //         console.log(response.data)
  //       } catch (error) {
  //         console.error("Error fetching cv information:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchCvInfo();
  //   }
  // }, [userData]);
  if (loading) {
    return <Loading />;
  }

  const handleCreateCv = () => {
    navigate("/createCv");
  };

  const handleUpdateCv = () => {
    navigate(`/updateCv/${userData.id}`);
  };

  return (
    <div>
      {userInfo && (
        <>
          <Box
            sx={{
              // display: "flex",
              // alignItems: "center",
              width: "60%",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box
                // sx={{
                //   position: "relative",
                // }}
                >
                  <Grid
                    item
                    xs={12}
                    sx={{
                      margin: "auto",
                      marginBottom: "20px",
                    }}
                  >
                    <Avt
                      finalTheme={finalTheme}
                      avatarBase64={avatarBase64}
                      userInfo={userInfo}
                      avtEmpty={avtEmpty}
                      setAvatarBase64={setAvatarBase64}
                      setFormData={setFormData}
                      formData={formData}
                      editing={editing}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid container item xs={12}>
                <Grid item xs={4}>
                  <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                    <LeftSide
                      profile={userInfo}
                      handleChange={handleChange}
                      formData={formData}
                      handleUpdate={handleUpdate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Rating />
                  </Grid>
                </Grid>

                <Grid item xs={8}>
                  <Box sx={{ marginLeft: "20px", marginBottom: "20px" }}>
                    <BigCard>
                      {userInfo.role === "Worker" ? (
                        <TabContext value={value}>
                          <Box>
                            <TabList
                              onChange={handleChangeTab}
                              aria-label="lab API tabs example"
                            >
                              <Tab label="Your CV" value="1" />
                              <Tab label="Apply History" value="2" />
                              <Tab label="Work History" value="3" />
                            </TabList>
                          </Box>
                          <TabPanel value="1">
                            <ProfileCv
                              userInfo={userInfo}
                              cvinfo={cvinfo}
                              handleCvDelete={handleCvDelete}
                              handleUpdateCv={handleUpdateCv}
                              handleCreateCv={handleCreateCv}
                            />
                          </TabPanel>
                          <TabPanel value="2">Item Two</TabPanel>
                          <TabPanel value="3">Item Three</TabPanel>
                        </TabContext>
                      ) : (
                        <>
                          <TabContext value={value}>
                            <Box>
                              <TabList
                                onChange={handleChangeTab}
                                aria-label="lab API tabs example"
                              >
                                <Tab label="Your Job" value="1" />
                                <Tab label="Worker" value="2" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <MyJob />
                            </TabPanel>
                            <TabPanel value="2">Item Two</TabPanel>
                          </TabContext>
                        </>
                      )}
                    </BigCard>
                  </Box>
                  {/* {userInfo.role === "Worker" ? (
                    <Grid container>
                      <Grid container item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            marginLeft: "20px",

                            display: "flex",
                            justifyContent: "right",
                          }}
                        >
                          {cvinfo.message === "CV not found" ? (
                            <>
                              <Button
                                size="large"
                                variant="contained"
                                onClick={handleCreateCv}
                                sx={{ arginTop: "15px" }}
                              >
                                {" "}
                                Create CV
                              </Button>
                            </>
                          ) : (
                            <>
                              <Grid container>
                                <Grid item xs={12}>
                                  <ViewCv cvinfo={cvinfo.data} />
                                </Grid>
                              </Grid>
                            </>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  ) : null}
                  {userInfo.role === "Worker" ? (
                    cvinfo.message === "CV not found" ? (
                      <></>
                    ) : (
                      <Grid
                        container
                        item
                        xs={12}
                        sx={{ marginBottom: "20px" }}
                      >
                        <Grid item xs={6}></Grid>
                        <Grid item xs={3}>
                          <Button
                            size="large"
                            variant="contained"
                            color="error"
                            onClick={(e) => handleCvDelete()}
                            sx={{ marginTop: "15px" }}
                          >
                            {" "}
                            Delete CV
                          </Button>
                        </Grid>
                        <Grid item xs={3}>
                          <Button
                            size="large"
                            variant="contained"
                            onClick={handleUpdateCv}
                            sx={{ marginTop: "15px" }}
                          >
                            {" "}
                            Update CV
                          </Button>
                        </Grid>
                      </Grid>
                    )
                  ) : null} */}
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </div>
  );
}

export default Profile;
