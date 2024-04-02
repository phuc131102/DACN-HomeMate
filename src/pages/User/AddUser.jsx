import React, { useState } from "react";
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
import { sign_up } from "../../services/userAPI";
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

function AddUser() {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    formData.role = age;

    try {
      const response = await sign_up(formData);
      if (response) {
        navigate("/userlist");
        console.log("User signed up:", response);
      }
    } catch (error) {
      if (error.response) {
        const { status } = error.response;
        if (status === 404) {
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

  if (loading) {
    return <Loading />;
  }

  const handleCancel = () => {
    navigate("/userlist");
  };

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
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Typography variant="h5">Add New User</Typography>
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
                          variant="standard"
                          sx={{
                            width: "100%",
                            marginTop: "30px",
                            marginBottom: "15px",
                          }}
                        >
                          <InputLabel>Role</InputLabel>
                          <Select onChange={handleChangeRole}>
                            <MenuItem value="Homeowner">Homeowner</MenuItem>
                            <MenuItem value="Worker">Worker</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
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
                        type="email"
                        value={formData.email}
                        error={
                          !!formData.email &&
                          !/\S+@\S+\.\S+/.test(formData.email)
                        }
                        helperText={
                          !!formData.email &&
                          !/\S+@\S+\.\S+/.test(formData.email)
                            ? "Please enter a valid email address."
                            : ""
                        }
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
                          onClick={() => {
                            handleCancel();
                          }}
                          size="large"
                          variant="contained"
                          color="error"
                          sx={{
                            width: "30%",
                            margin: "auto",
                            marginBottom: "15px",
                            marginTop: "15px",
                          }}
                        >
                          Cancel
                        </Button>
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
                          Add User
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

export default AddUser;
