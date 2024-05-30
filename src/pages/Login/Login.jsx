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
import videoBg from "../../assets/nightwall.gif";
import { sign_in } from "../../services/userAPI";
import Loading from "../../components/Loading/Loading";
import { sha256 } from "js-sha256";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

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
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
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
  function handleHome(event) {
    event.preventDefault();
    navigate("/");
  }
  function handleForgot(event) {
    event.preventDefault();
    navigate("/resetpwdstep1");
  }

  useEffect(() => {
    if (localStorage.getItem("userData") !== null) {
      navigate("/");
    }
  }, [navigate]);

  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit2 = async (e) => {
    const hashedPassword = sha256(password);
    const formData = { email: email, password: hashedPassword };
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
        console.log(userData);
        let filterItem = [];
        const unSub = onSnapshot(doc(db, "contacts", userData.id), (res) => {
          const arrayMes = res.data();
          console.log(arrayMes)
          // setChat(arrayMes.chat.filter((item) => item.receiverId === id));
          if (arrayMes===undefined){
            console.log("vao r")
            const createUser = async () => {
              try {
                await setDoc(doc(db, "contacts", userData.id), {
                  chat: [],
                });
              } catch (err) {}
            };
            createUser();
          }
        });

        navigate("/");
        window.location.reload();
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
            <Box className="LoginBox">
              <Grid item xs={12} className="OutterGrid">
                <ThemeProvider theme={finalTheme}>
                  <form onSubmit={handleSubmit2}>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <Typography
                          variant="h6"
                          noWrap
                          sx={{
                            display: { md: "flex" },
                            fontWeight: 700,
                            fontSize: 35,
                            color: "black",
                            textDecoration: "none",
                            backgroundColor: "orange",
                            borderRadius: "10px",
                            padding: "5px",
                            cursor: "default",
                            userSelect: "none",
                          }}
                        >
                          Home Mate
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <Typography
                          variant="h2"
                          sx={{
                            fontWeight: 700,
                            cursor: "default",
                            userSelect: "none",
                          }}
                        >
                          SIGN IN
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
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
                    <Grid
                      item
                      container
                      xs={12}
                      className="remGrid"
                      justifyContent="flex-end"
                    >
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
                          type="submit"
                          sx={{
                            width: isSm ? "30%" : "110px",
                            margin: "auto",
                            marginBottom: "20px",
                          }}
                        >
                          Sign in
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <Typography variant="small" sx={{ color: "black" }}>
                          Do not have an account?{" "}
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
