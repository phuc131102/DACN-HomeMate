import React from "react";
import BigCard from "../../../components/BigCard/BigCard";
import { Box, Grid, Rating } from "@mui/material";
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
  Star,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
function Rate(prop) {
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
      <Box sx={{ marginBottom: "20px" }}>
        <BigCard>
          <Grid container spacing={3}>
            <Grid item container md={12} xs={12}>
              <Box p="24px 24px 0 24px"></Box>
            </Grid>

            <Grid item container md={12} xs={12}>
              <Box px={3} sx={{ marginBottom: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Star sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "5.5px", m: 0 }}
                  >
                    My Rating
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  <Rating name="simple-controlled" value={2} readOnly />
                  {/* change value here */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </BigCard>
      </Box>
    </>
  );
}

export default Rate;
