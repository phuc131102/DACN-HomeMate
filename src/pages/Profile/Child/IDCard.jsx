import React, { useState } from "react";
import BigCard from "../../../components/BigCard/BigCard";
import {
  Box,
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Email, Phone, Home, Close } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import EditDialog from "./EditDialog";
import ComponentDivider from "../../../components/ComponentDivider/ComponentDivider";

function IDCard(prop) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <BigCard>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ marginTop: "15px" }}>
            <ComponentDivider>ID Card</ComponentDivider>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box px={3}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Email sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "2px", m: 0 }}
                  >
                    ID Number
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  <Typography varriant="h1" sx={{ wordWrap: "break-word" }}>
                    {prop.profile.cccd_num}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box px={3}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Phone sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "2px", m: 0 }}
                  >
                    ID Card
                  </Box>
                </Box>
                <Box
                  sx={{ padding: "16px 0 20px 40px" }}
                  onClick={() => handleClickOpen()}
                >
                  <img
                    style={{ width: "250px" }}
                    src={prop.profile.cccd_image}
                    alt={prop.profile.name}
                  />
                </Box>
                <Dialog open={open} onClose={handleClose} maxWidth="">
                  <DialogTitle>
                    <>
                      <Typography
                        sx={{ fontSize: "20px", textAlign: "center" }}
                      >
                        ID Number: <b>{prop.profile.cccd_num}</b>
                      </Typography>
                      <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          color: (theme) => theme.palette.grey[500],
                        }}
                      >
                        <Close />
                      </IconButton>
                    </>
                  </DialogTitle>
                  <DialogContent dividers>
                    <img
                      src={prop.profile.cccd_image}
                      alt={prop.profile.name}
                      style={{ width: "100%" }}
                    />
                  </DialogContent>
                </Dialog>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {prop.profile.status === "Rejected" && (
          <Grid item xs={12}>
            <Box
              sx={{
                width: "100%",
                justifyContent: "center",
                display: "flex",
                marginBottom: "20px",
              }}
            >
              <EditDialog
                IDcard={true}
                error={prop.error}
                handleCancle={prop.handleCancle}
                profile={prop.profile}
                handleChange={prop.handleChange}
                formData={prop.formData}
                setFormData={prop.setFormData}
                handleUpdate={prop.handleUpdate}
                finalTheme={prop.finalTheme}
                avatarBase64={prop.avatarBase64}
                setAvatarBase64={prop.setAvatarBase64}
                editing={prop.editing}
                handleEdit={prop.handleEdit}
              />
            </Box>
          </Grid>
        )}
      </BigCard>
    </>
  );
}

export default IDCard;
