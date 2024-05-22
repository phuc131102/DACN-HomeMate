import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PasswordVisibilityToggle from "../../components/passView/passView";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Modal,
} from "@mui/material";
import "./Signup.css";
import videoBg from "../../assets/nightwall.gif";
import { sign_up, verify_code } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MuiOtpInput } from "mui-one-time-password-input";

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

export function matchIsUppercaseLetterOrNumber(text) {
  const isUppercaseLetter = /^[A-Z]$/.test(text);
  const isNumber = /^[0-9]$/.test(text);
  return isUppercaseLetter || isNumber;
}

const validateChar = (value, index) => {
  const uppercasedValue = value.toUpperCase();
  return matchIsUppercaseLetterOrNumber(uppercasedValue);
};

function Signup() {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(null);
  const [newValue, setNewValue] = useState("");

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const styles = {
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 500,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };

  const [age, setAge] = React.useState("");

  const handleChangeRole = (event) => {
    setAge(event.target.value);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange2 = (newValue) => {
    const uppercasedValue = newValue.toUpperCase();
    setNewValue(uppercasedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateEmail(formData.email)) {
      setError("Invalid email format.");
      setLoading(false);
      return;
    }
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    formData.role = age;

    try {
      const response = await sign_up(formData);
      if (response) {
        setVerifyEmail(formData.email);
        handleOpenModal();
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          setError("All field is required.");
          setLoading(false);
        } else if (status === 409) {
          setError("Email has been used.");
          setLoading(false);
        }
      }
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData2 = {
      email: verifyEmail,
      verification_code: newValue,
    };
    try {
      const response = await verify_code(formData2);
      if (response) {
        navigate("/");
        alert(
          "Your account is created successfully. Click OK to navigate to sign in."
        );
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 409) {
          setError2("Invalid verification code.");
          setLoading(false);
        }
      }
      console.error("Sign up failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  function handleSignIn(event) {
    event.preventDefault();
    navigate("/");
  }

  return (
    <>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={videoBg}
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                maxWidth: isSm ? "500px" : "90%",
                margin: "auto",
                border: "1px solid black",
                borderRadius: "10px",
                marginTop: "10px",
                marginBottom: "10px",
                backgroundColor: "white",
                opacity: "90%",
                position: "relative",
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
                  <form onSubmit={handleSubmit}>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h2" sx={{ fontWeight: 700 }}>
                          SIGN UP
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <TextField
                          id="outlined-basic"
                          sx={{
                            width: "100%",
                            [`& fieldset`]: { borderRadius: 8 },
                            marginTop: "30px",
                            marginBottom: "15px",
                          }}
                          variant="outlined"
                          label="User Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <FormControl
                          variant="outlined"
                          sx={{
                            width: "100%",
                            [`& fieldset`]: { borderRadius: 8 },
                            marginTop: "30px",
                            marginBottom: "15px",
                          }}
                        >
                          <InputLabel>Role</InputLabel>
                          <Select onChange={handleChangeRole}>
                            <MenuItem value="Homeowner">Homeowner</MenuItem>
                            <MenuItem value="Worker">Worker</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },

                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },
                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        InputProps={{
                          endAdornment: (
                            <PasswordVisibilityToggle
                              visible={showPassword}
                              onToggle={handleTogglePasswordVisibility}
                            />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },
                          marginBottom: "15px",
                        }}
                        variant="outlined"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        InputProps={{
                          endAdornment: (
                            <PasswordVisibilityToggle
                              visible={showConfirmPassword}
                              onToggle={handleToggleConfirmPasswordVisibility}
                            />
                          ),
                        }}
                      />
                    </Grid>

                    {error && (
                      <Typography variant="body2" color="error" align="center">
                        {error}
                      </Typography>
                    )}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <Button
                          type="submit"
                          size="large"
                          variant="contained"
                          sx={{
                            width: isSm ? "30%" : "110px",
                            margin: "auto",
                            marginBottom: "15px",
                            marginTop: "15px",
                          }}
                        >
                          Sign up
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="textBottom">
                        <Typography variant="small" sx={{ color: "black" }}>
                          Already have an account?{" "}
                          <Typography
                            onClick={(e) => handleSignIn(e)}
                            variant="small"
                            sx={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              color: "black",
                            }}
                          >
                            Sign in now
                          </Typography>
                        </Typography>
                      </Box>
                    </Grid>
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  maxWidth: isSm ? "500px" : "90%",
                  margin: "auto",
                  border: "1px solid black",
                  borderRadius: "10px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  backgroundColor: "white",
                  opacity: "90%",
                  position: "relative",
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
                    <form onSubmit={handleSubmit2}>
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{ textAlign: "center", marginBottom: "5%" }}
                          >
                            A verify code has been sent to your email. Please
                            input the code to verify yourself.
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <MuiOtpInput
                          length={6}
                          value={newValue}
                          name="verification_code"
                          onChange={handleChange2}
                          validateChar={validateChar}
                        />
                      </Grid>

                      {error2 && (
                        <Typography
                          variant="body2"
                          color="error"
                          align="center"
                        >
                          {error2}
                        </Typography>
                      )}
                      <Grid item xs={12}>
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                          }}
                        >
                          <Button
                            type="submit"
                            size="large"
                            variant="contained"
                            sx={{
                              width: isSm ? "30%" : "110px",
                              margin: "auto",
                              marginBottom: "15px",
                              marginTop: "15px",
                            }}
                          >
                            Confirm
                          </Button>
                        </Box>
                      </Grid>
                    </form>
                  </ThemeProvider>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default Signup;
