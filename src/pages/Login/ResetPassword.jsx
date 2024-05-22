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
} from "@mui/material";
import videoBg from "../../assets/nightwall.gif";
import { update_user_info } from "../../services/userAPI";
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

function ResetPassword() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const [formData, setFormData] = useState({
    id: "",
    pwd: "",
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

  const idFromUrl = new URLSearchParams(window.location.search).get("token");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      id: idFromUrl,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.pwd !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const response = await update_user_info(formData);
      if (response) {
        alert("Change password successfully !");
        navigate("/");
        console.log(response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
          setError("All field is required.");
          setLoading(false);
        }
      }
      console.error("Update failed:", error);
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
                  <form onSubmit={handleSubmit}>
                    <Grid
                      item
                      xs={12}
                      sx={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h4">
                          Enter your new password
                        </Typography>
                      </Box>
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
                        name="pwd"
                        value={formData.pwd}
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
                            width: "30%",
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
    </>
  );
}

export default ResetPassword;
