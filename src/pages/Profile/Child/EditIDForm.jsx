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
import IDImage from "./IDImage";
function EditIDForm(prop) {
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
                  label="ID Number"
                  type="number"
                  placeholder={prop.profile.cccd_num}
                  name="cccd_num"
                  value={prop.formData.cccd_num}
                  onChange={prop.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <IDImage
                  finalTheme={finalTheme}
                  avatarBase64={prop.avatarBase64}
                  userInfo={prop.profile}
                  setAvatarBase64={prop.setAvatarBase64}
                  setFormData={prop.setFormData}
                  formData={prop.formData}
                  editing={prop.editing}
                  handleEdit={prop.handleEdit}
                  handleUpdate={prop.handleUpdate}
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

export default EditIDForm;
