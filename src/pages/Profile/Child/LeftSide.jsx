import React from "react";
import BigCard from "../../../components/BigCard/BigCard";
import { Box, Grid, Button } from "@mui/material";
import {
  AssignmentTurnedIn,
  Email,
  EmojiEvents,
  IntegrationInstructions,
  Language,
  LocationOn,
  Person,
  Phone,
  Public,
  School,
  Edit,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import EditDialog from "./EditDialog";

function LeftSide(prop) {
  //   address
  // :
  // ""
  // email
  // :
  // "worker1@gmail.com"
  // name
  // :
  // "thang2"
  // password
  // :
  // "123"
  // phone_num
  // :
  // ""
  // role
  // :
  // "Worker"
  return (
    <>
      <BigCard>
        <Grid container spacing={3}>
          <Grid item container md={12} xs={12}>
            <Box p="24px 24px 0 24px"></Box>
          </Grid>

          <Grid item container md={12} xs={12}>
            <Box px={3}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <Public sx={{ mr: "15px" }} />
                <Box
                  component="h2"
                  sx={{ position: "relative", top: "5.5px", m: 0 }}
                >
                  Profile
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box px={3}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Email sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "5.5px", m: 0 }}
                  >
                    Email:
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
                  <Email sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "5.5px", m: 0 }}
                  >
                    Phone Number:
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  <Typography varriant="h1" sx={{ wordWrap: "break-word" }}>
                    {prop.profile.phone_num}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box px={3}>
              <Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Email sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "5.5px", m: 0 }}
                  >
                    Address:
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 20px 40px" }}>
                  <Typography varriant="h1" sx={{ wordWrap: "break-word" }}>
                    {prop.profile.address}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", justifyContent:"center", display:"flex", marginBottom:"20px" }}>
            {/* <Button sx={{ width: "85%", margin: "auto" }} variant="contained">
              {" "}
              Edit Profile
            </Button> */}
            <EditDialog profile={prop.profile} handleChange={prop.handleChange} formData={prop.formData} handleUpdate={prop.handleUpdate}/>
          </Box>
        </Grid>
      </BigCard>
    </>
  );
}

export default LeftSide;
