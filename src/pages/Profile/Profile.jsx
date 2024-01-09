import React, { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
import BigCard from "../../components/BigCard/BigCard";

function Profile() {
  const [error, setError] = useState("");
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarBase64, setAvatarBase64] = useState("");

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
          setLoading(false);
        }
      };
      fetchUserInfo();
    }
  }, [userData]);

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
                      marginBottom: "150px",
                    }}
                  >
                    <ThemeProvider theme={finalTheme}>
                      {editing ? (
                        <>
                          <Grid item xs={12}>
                            {avatarBase64 ? (
                              <Box
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  alt={avatarBase64}
                                  src={avatarBase64}
                                  style={{
                                    width: "30%",
                                    height: "auto",
                                    marginTop: "20%",
                                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                                  }}
                                />
                              </Box>
                            ) : userInfo.avatar === "" ? (
                              <Box
                                sx={{
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <img
                                  alt="Kisspng computer"
                                  src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/kisspng-computer-icons-portable-network-graphics-vector-gr-perso.png"
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
                                      setAvatarBase64(base64data);
                                      setFormData({
                                        ...formData,
                                        avatar: avatarBase64,
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
                      ) : userInfo.avatar !== "" ? (
                        <Grid item xs={12}>
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
                                marginBottom: "5%",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                              }}
                            />
                          </Box>
                        </Grid>
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
                              alt="Kisspng computer"
                              src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/kisspng-computer-icons-portable-network-graphics-vector-gr-perso.png"
                              style={{
                                width: "30%",
                                height: "auto",
                                marginTop: "20%",
                                marginBottom: "5%",
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                              }}
                            />
                          </Box>
                        </Grid>
                      )}

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
                    // position: "sticky",
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
                      <form onSubmit={handleUpdate}>
                        <br />
                        {editing ? (
                          <>
                            <Grid item xs={12}>
                              <TextField
                                sx={{
                                  width: "100%",
                                  [`& fieldset`]: { borderRadius: 8 },
                                  marginBottom: "15px",
                                }}
                                id="outlined-basic"
                                label="User Name"
                                placeholder={userInfo.name}
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                sx={{
                                  width: "100%",
                                  [`& fieldset`]: { borderRadius: 8 },
                                  marginBottom: "15px",
                                }}
                                id="outlined-basic"
                                label="Email"
                                placeholder={userInfo.email}
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                sx={{
                                  width: "100%",
                                  [`& fieldset`]: { borderRadius: 8 },
                                  marginBottom: "15px",
                                }}
                                id="outlined-basic"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder={userInfo.password}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                InputProps={{
                                  endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        onClick={handleTogglePasswordVisibility}
                                        edge="end"
                                      >
                                        {showPassword ? (
                                          <VisibilityOff />
                                        ) : (
                                          <Visibility />
                                        )}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                sx={{
                                  width: "100%",
                                  [`& fieldset`]: { borderRadius: 8 },
                                  marginBottom: "15px",
                                }}
                                id="outlined-basic"
                                label="Address"
                                placeholder={userInfo.address}
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                sx={{
                                  width: "100%",
                                  [`& fieldset`]: { borderRadius: 8 },
                                  marginBottom: "15px",
                                }}
                                id="outlined-basic"
                                label="Phone Number"
                                placeholder={userInfo.phone_num}
                                name="phone_num"
                                value={formData.phone_num}
                                onChange={handleChange}
                              />
                            </Grid>
                          </>
                        ) : (
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
                                label="Password"
                                defaultValue={userInfo.password}
                                type="password"
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
                        )}
                        {error && (
                          <Typography
                            variant="body2"
                            color="error"
                            align="center"
                          >
                            {error}
                          </Typography>
                        )}
                        <Grid item xs={12}>
                          <Box sx={{ width: "100%", display: "flex" }}>
                            {editing ? (
                              <>
                                <Button
                                  type="submit"
                                  size="large"
                                  variant="contained"
                                  sx={{
                                    width: "30%",
                                    margin: "auto",
                                    marginTop: "15px",
                                  }}
                                >
                                  Update
                                </Button>
                                <Button
                                  onClick={handleCancel}
                                  size="large"
                                  variant="contained"
                                  color="error"
                                  sx={{
                                    width: "30%",
                                    margin: "auto",
                                    marginTop: "15px",
                                  }}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  setEditing(true);
                                }}
                                size="large"
                                variant="contained"
                                sx={{
                                  width: "40%",
                                  margin: "auto",
                                  marginTop: "15px",
                                }}
                              >
                                Edit Profile
                              </Button>
                            )}
                          </Box>
                        </Grid>
                      </form>
                    </ThemeProvider>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Grid container>
            <Grid item xs={12}>
              {" "}
              <ComponentDivider>CV</ComponentDivider>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ width: "80%", margin: "auto", marginBottom:"50px", marginTop:"10px" }}>
                  <ViewCv />
              </Box>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}

export default Profile;
