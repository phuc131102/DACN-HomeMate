import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  IconButton,
  /* Link, */
  Stack,
} from "@mui/material";
import "./Login.css";
import videoBg from "../../assets/nightwall.webm";

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
            <Box
              sx={{
                maxWidth: "500px",
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
                  <form>
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <HomeIcon sx={{ fontSize: 100 }}></HomeIcon>
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
                        <Typography variant="h1">Login</Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Typography>Username</Typography> */}
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },
                          marginTop: "60px",
                          marginBottom: "30px",
                        }}
                        variant="outlined"
                        label="User Name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      {/* <Typography>Password</Typography> */}
                      <TextField
                        id="outlined-basic"
                        sx={{
                          width: "100%",
                          [`& fieldset`]: { borderRadius: 8 },
                          marginBottom: "30px",
                        }}
                        variant="outlined"
                        label="Password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ width: "100%", display: "flex" }}>
                        <Button
                          size="large"
                          variant="contained"
                          sx={{
                            width: "30%",
                            margin: "auto",
                            marginBottom: "15px",
                          }}
                        >
                          Login
                        </Button>
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
                        <Link to="/signup">
                          <Typography variant="h8">
                            Don't have an account? Register here.
                          </Typography>
                        </Link>
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
