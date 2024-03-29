import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import PasswordVisibilityToggle from "../../components/passView/passView";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import "./Login.css";
import videoBg from "../../assets/nightwall.webm";
import { sign_in } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";

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

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  function handleUserName(e) {
    setEmail(e.target.value);
    console.log(email);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
    console.log(password);
  }
  function handleCheck() {
    setCheck(!check);
    console.log(check);
  }
  function handleSignUp(event) {
    event.preventDefault();
    navigate("/signup");
  }
  function handleForgot(event) {
    event.preventDefault();
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      navigate("/home");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit2 = async (e) => {
    const formData = { email: email, password: password };
    e.preventDefault();
    setLoading(true);
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      console.log("invalid email");
      setLoading(false);
      return;
    }
    try {
      const response = await sign_in(formData);
      if (response) {
        const userData = response.data;
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("activeTab", "home");
        navigate("/home");
        console.log("User signed in:", response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          setError("Wrong email or password.");
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
        <video
          src={videoBg}
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh",
            objectFit: "cover",
          }}
        ></video>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box className="LoginBox">
              <Grid item xs={12} className="OutterGrid">
                <ThemeProvider theme={finalTheme}>
                  <form onSubmit={handleSubmit2}>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <HomeIcon sx={{ fontSize: 100 }}></HomeIcon>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <Typography variant="h1">Login</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Typography>Username</Typography> */}
                      <TextField
                        sx={{
                          [`& fieldset`]: { borderRadius: 8 },
                        }}
                        className="textDisplay"
                        variant="outlined"
                        label="Email"
                        name="email"
                        onChange={(e) => handleUserName(e)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Typography>Password</Typography> */}
                      <TextField
                        sx={{
                          [`& fieldset`]: { borderRadius: 8 },
                        }}
                        variant="outlined"
                        className="textDisplay2"
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => handlePassword(e)}
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
                    <Grid item container xs={12} className="remGrid">
                      <Grid item xs={6}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={check}
                              onClick={handleCheck}
                              //size="small"
                              sx={{
                                color: "black",
                                "&.Mui-checked": {
                                  color: "black",
                                },
                                "& .MuiSvgIcon-root": {
                                  fontSize: 18,
                                },
                                //fontSize: '1em',
                                height: "8px",
                                width: "8px",
                                marginLeft: "9px",
                              }}
                            />
                          }
                          label={
                            <Typography
                              variant="small"
                              sx={{
                                lineHeight: "15px",
                                marginLeft: "3px",
                              }}
                            >
                              Remember me
                            </Typography>
                          }
                          className="remember"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Box className="forgotBox">
                          <Typography
                            onClick={(e) => handleForgot(e)}
                            variant="small"
                            className="forgot"
                          >
                            Forgot password?{" "}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                    {error && (
                      <Typography variant="body2" color="error" align="center">
                        {error}
                      </Typography>
                    )}
                    <Grid item xs={12}>
                      <Box className="buttonBox">
                        <Button
                          size="large"
                          variant="contained"
                          className="loginButton"
                          type="submit"
                        >
                          Login
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <Typography variant="small" sx={{ color: "black" }}>
                          Didn't have an account?{" "}
                          <Typography
                            onClick={(e) => handleSignUp(e)}
                            variant="small"
                            sx={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              color: "black",
                            }}
                          >
                            Sign up
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
    </>
  );
}

export default Login;
