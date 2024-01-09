import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";

export default function LeftCvComponent(comp) {
  return (
    <>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Grid container>
          {comp.comp.skills.map((x) => (
            <Grid item xs={6} sx={{display:"flex", justifyContent:"center"}}>
              <Chip icon={<FaceIcon />} label={x.name} variant="outlined" sx={{marginTop:"15px"}}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
