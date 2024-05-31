import React from "react";
import BigCard from "../../../components/BigCard/BigCard";
import { Box, Grid, Button } from "@mui/material";
import { Email, Phone, Home } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import EditDialog from "./EditDialog";
import ComponentDivider from "../../../components/ComponentDivider/ComponentDivider";

function LeftSide(prop) {
  return (
    <>
      <BigCard>
        <Grid container spacing={3}>
          <Grid item xs={12} sx={{ marginTop: "15px" }}>
            <ComponentDivider>Profile</ComponentDivider>
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
                    Email
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  <Typography varriant="h1" sx={{ wordWrap: "break-word" }}>
                    {prop.profile.email}
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
                    Phone Number
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  <Typography varriant="h1" sx={{ wordWrap: "break-word" }}>
                    {prop.profile.phone_num
                      ? prop.profile.phone_num
                      : "No Phone Number available."}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box px={3}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Home sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "2px", m: 0 }}
                  >
                    Address
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 20px 40px" }}>
                  <Typography varriant="h1" sx={{ wordWrap: "break-word" }}>
                    {prop.profile.address
                      ? prop.profile.address
                      : "No Address available."}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
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
              error={prop.error}
              handleCancle={prop.handleCancle}
              profile={prop.profile}
              handleChange={prop.handleChange}
              formData={prop.formData}
              handleUpdate={prop.handleUpdate}
              handleTogglePasswordVisibility={
                prop.handleTogglePasswordVisibility
              }
              showPassword={prop.showPassword}
              block={prop.profile.block}
            />
          </Box>
        </Grid>
      </BigCard>
    </>
  );
}

export default LeftSide;
