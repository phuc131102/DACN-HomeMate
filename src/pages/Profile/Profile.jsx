import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Avt from "./Child/Avt";
import { Grid, Box } from "@mui/material";
import { get_user_info, update_user_info } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
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
import { working_info } from "../../services/jobAPI";
import ApplyHistory from "./Child/ApplyHistory";

function Profile() {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");
  const [value, setValue] = useState("1");
  //
  // const [haveCv, setHaveCv] = useState(false);
  const [cvinfo, setCvInfo] = useState({});
  const [applyInfo, setApplyInfo] = useState([]);

  //
  useEffect(() => {
    if (userData && userData.id) {
      const fetchUserInfo = async () => {
        setLoading(true);
        try {
          const response = await get_user_info(userData.id);
          setUserInfo(response);
          setFormData((prevData) => ({
            ...prevData,
            name: response.name,
            email: response.email,
            password: response.password,
            address: response.address,
            phone_num: response.phone_num
          }));
        } catch (error) {
          console.error("Error fetching user information:", error);
        } finally {
          try {
            const response = await get_cv_info(userData.id);
            setCvInfo(response);
          } catch (error) {
            console.error("Error fetching cv information:", error);
          } finally {
            try {
              const response2 = await working_info();
              if (response2.length > 0) {
                setApplyInfo(
                  response2.filter(
                    (item) => item.worker._id.$oid === userData.id
                  )
                );
              }
            } catch (error) {
              console.error("Error fetching apply information:", error);
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
  // console.log(formData);
  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
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
      // console.log(finaldata)
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
              width: "60%",
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
              <Grid container item xs={12}>
                <Grid item xs={4}>
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
                          <TabPanel value="2"><ApplyHistory applyInfo={applyInfo}/></TabPanel>
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
