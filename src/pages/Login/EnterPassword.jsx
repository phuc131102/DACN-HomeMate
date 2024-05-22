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
import { reset_password } from "../../services/userAPI";
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

function EnterPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleUserName(e) {
    setEmail(e.target.value);
  }
  function handleSignIn(event) {
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
    e.preventDefault();
    setLoading(true);
    if (!validateEmail(email)) {
      setError("Invalid email format.");
      console.log("invalid email");
      setLoading(false);
      return;
    }
    try {
      const response = await reset_password(email);
      if (response) {
        alert(
          "Reset link has been sent to your email address. Please follow the instruction to reset your password."
        );
        navigate("/");
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          setError("This email is not available.");
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
              <Grid
                item
                xs={12}
                sx={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
                className="OutterGrid"
              >
                <ThemeProvider theme={finalTheme}>
                  <form onSubmit={handleSubmit2}>
                    <Grid item xs={12} sx={{ marginTop: "2%" }}>
                      <Box className="HomeIcon">
                        <Typography variant="h4" sx={{ fontFamily: "fantasy" }}>
                          Reset your password
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
                        label="Enter your email"
                        name="email"
                        onChange={(e) => handleUserName(e)}
                      />
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
                          Send
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Box className="HomeIcon">
                        <Typography variant="small" sx={{ color: "black" }}>
                          Or back to{" "}
                          <Typography
                            onClick={(e) => handleSignIn(e)}
                            variant="small"
                            sx={{
                              cursor: "pointer",
                              textDecoration: "underline",
                              color: "black",
                            }}
                          >
                            Sign in
                          </Typography>{" "}
                          here.
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

export default EnterPassword;
