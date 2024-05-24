import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Avt from "./Child/Avt";
import { Grid, Box, Button } from "@mui/material";
import { update_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { get_cv_info, delete_cv } from "../../services/cvAPI";
import avtEmpty from "../../assets/avt_empty.png";
import LeftSide from "./Child/LeftSide";
import Rate from "./Child/Rating";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ProfileCv from "./Child/ProfileCv";
import BigCard from "../../components/BigCard/BigCard";
import MyJob from "./Child/Myjob";
import { apply_history, working_history } from "../../services/jobAPI";
import ApplyHistory from "./Child/ApplyHistory";
import YourWorker from "./Child/YourWorker";
import AdminBox from "./Child/AdminBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import useUserInfo from "../../utils/userUtils/useUserInfo";

function Profile() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  // const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [value, setValue] = useState("1");
  const [cvinfo, setCvInfo] = useState({});
  const [applyStatus, setApplyStatus] = useState([]);
  const [workingStatus, setWorkingStatus] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    pwd: "",
    address: "",
    phone_num: "",
  });
  const [defData, setDefData] = useState({
    id: "",
    name: "",
    email: "",
    pwd: "",
    address: "",
    phone_num: "",
  });
  const { userInfo } = useUserInfo(userData?.id);

  useEffect(() => {
    if (userInfo) {
      setFormData((prevData) => ({
        ...prevData,
        name: userInfo.name,
        email: userInfo.email,
        pwd: "",
        address: userInfo.address,
        phone_num: userInfo.phone_num,
      }));

      setDefData((prevData) => ({
        ...prevData,
        name: userInfo.name,
        email: userInfo.email,
        pwd: "",
        address: userInfo.address,
        phone_num: userInfo.phone_num,
      }));
    }
  }, [userInfo]);

  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_cv_info(userData.id);
          setCvInfo(response);
        } catch (error) {
          console.error("Error fetching cv information:", error);
        } finally {
          try {
            const response = await apply_history(userData.id);
            if (response.length > 0) {
              setApplyStatus(response);
            }
          } catch (error) {
            console.error("Error fetching apply information:", error);
          } finally {
            try {
              const response = await working_history(userData.id);
              if (response.length > 0) {
                setWorkingStatus(response);
              }
            } catch (error) {
              console.error("Error fetching working information:", error);
            } finally {
              setLoading(false);
            }
          }
        }
      };
      fetchUserInfo();
    }
  }, [userData]);

  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCancle = () => {
    setFormData(defData);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      setFormData((prevData) => ({
        ...prevData,
        id: parsedUserData.id || "",
      }));
      setDefData((prevData) => ({
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

    if (updatedFormData.pwd !== "") {
      finalData.pwd = updatedFormData.pwd;
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
  const validateEmail = (email) => {
    const emailPattern = /^\s*$|^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhonenum = (phone_num) => {
    const phonePattern = /^\d*$/;
    return phonePattern.test(phone_num);
  };

  const [editing, setEditing] = useState(false);
  const handleEdit = () => {
    setEditing(true);
  };
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

  if (loading) {
    return <Loading />;
  }

  const handleAdmin = () => {
    navigate("/admin");
  };

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
              width: isMd ? "60%" : "100%",
              margin: "auto",
              marginTop: "100px",
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Box>
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
                      handleEdit={handleEdit}
                      handleUpdate={handleUpdate}
                    />
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                container
                item
                xs={12}
                spacing={3}
                sx={{ marginBottom: "20px" }}
              >
                <Grid item xs={12} md={4}>
                  <Grid item xs={12} sx={{ marginBottom: "20px" }}>
                    <LeftSide
                      profile={userInfo}
                      handleChange={handleChange}
                      formData={formData}
                      handleUpdate={handleUpdate}
                      handleTogglePasswordVisibility={
                        handleTogglePasswordVisibility
                      }
                      showPassword={showPassword}
                      error={error}
                      handleCancle={handleCancle}
                    />
                  </Grid>
                  {userData.role === "Worker" ? (
                    <Grid item xs={12}>
                      <Rate rating={userInfo.rating} />
                    </Grid>
                  ) : null}
                </Grid>

                <Grid item xs={12} md={8}>
                  <Box sx={{ marginBottom: "20px" }}>
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
                          <TabPanel value="2">
                            <ApplyHistory applyInfo={applyStatus} />
                          </TabPanel>
                          <TabPanel value="3">
                            <ApplyHistory applyInfo={workingStatus} />
                          </TabPanel>
                        </TabContext>
                      ) : userInfo.role === "Homeowner" ? (
                        <>
                          <TabContext value={value}>
                            <Box>
                              <TabList
                                onChange={handleChangeTab}
                                aria-label="lab API tabs example"
                              >
                                <Tab label="Your Job" value="1" />
                                <Tab label="Your Worker" value="2" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <MyJob id={userData.id} />
                            </TabPanel>
                            <TabPanel value="2">
                              <YourWorker />
                            </TabPanel>
                          </TabContext>
                        </>
                      ) : (
                        <>
                          <TabContext value={value}>
                            <Box>
                              <TabList
                                onChange={handleChangeTab}
                                aria-label="lab API tabs example"
                              >
                                <Tab label="Dashboard" value="1" />
                              </TabList>
                            </Box>
                            <TabPanel value="1">
                              <Box
                                sx={{
                                  width: "90%",
                                  margin: "auto",
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <Button
                                  variant="text"
                                  onClick={handleAdmin}
                                  endIcon={<ArrowForwardIosIcon />}
                                >
                                  More Information
                                </Button>
                              </Box>
                              <AdminBox />
                            </TabPanel>
                          </TabContext>
                        </>
                      )}
                    </BigCard>
                  </Box>
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
