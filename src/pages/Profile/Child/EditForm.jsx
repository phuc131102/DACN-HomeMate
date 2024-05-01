import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
function EditForm(prop) {
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
  return (
    <>
      <ThemeProvider theme={finalTheme}>
        <form onSubmit={prop.handleUpdate}>
          <br />
          {
            <>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    width: "100%",
                    [`& fieldset`]: { borderRadius: 8 },
                    marginBottom: "15px",
                  }}
                  // id="outlined-basic"
                  label="User Name"
                  placeholder={prop.profile.name}
                  name="name"
                  value={prop.formData.name}
                  onChange={prop.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    width: "100%",
                    [`& fieldset`]: { borderRadius: 8 },
                    marginBottom: "15px",
                  }}
                  // id="outlined-basic"
                  label="Email"
                  placeholder={prop.profile.email}
                  name="email"
                  value={prop.formData.email}
                  onChange={prop.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    width: "100%",
                    [`& fieldset`]: { borderRadius: 8 },
                    marginBottom: "15px",
                  }}
                  // id="outlined-basic"
                  label="Password"
                  type={prop.showPassword ? "text" : "password"}
                  placeholder={prop.profile.password}
                  name="password"
                  value={prop.formData.password}
                  onChange={prop.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={prop.handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {prop.showPassword ? (
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
                  // id="outlined-basic"
                  label="Address"
                  placeholder={prop.profile.address}
                  name="address"
                  value={prop.formData.address}
                  onChange={prop.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{
                    width: "100%",
                    [`& fieldset`]: { borderRadius: 8 },
                    marginBottom: "15px",
                  }}
                  // id="outlined-basic"
                  label="Phone Number"
                  placeholder={prop.profile.phone_num}
                  name="phone_num"
                  value={prop.formData.phone_num}
                  onChange={prop.handleChange}
                />
              </Grid>
            </>
          }
          {prop.error && (
            <Typography variant="body2" color="error" align="center">
              {prop.error}
            </Typography>
          )}
          <Grid item xs={12}>
            <Box sx={{ width: "100%", display: "flex" }}>
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
                  onClick={prop.handleClose}
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
            </Box>
          </Grid>
        </form>
      </ThemeProvider>
    </>
  );
}

export default EditForm;
