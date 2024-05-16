import React from "react";
import BigCard from "../../../components/BigCard/BigCard";
import { Box, Grid, Rating } from "@mui/material";
import {
  Star,
} from "@mui/icons-material";
function Rate(prop) {
  const ratingPoint =
    prop.rating.length === 0
      ? null
      : Math.round(
          (prop.rating.reduce((acc, curr) => acc + curr, 0) /
            prop.rating.length) *
            2
        ) / 2;
  return (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <BigCard>
          <Grid container spacing={3}>
            <Grid item container md={12} xs={12}>
              <Box p="0 24px 0 24px"></Box>
            </Grid>

            <Grid item container md={12} xs={12}>
              <Box px={3} sx={{ marginBottom: "20px" }}>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <Star sx={{ mr: "15px" }} />
                  <Box
                    component="h2"
                    sx={{ position: "relative", top: "2px", m: 0 }}
                  >
                    My Rating
                  </Box>
                </Box>
                <Box sx={{ padding: "16px 0 0 40px" }}>
                  <Rating
                    name="half-rating-read"
                    value={ratingPoint}
                    precision={0.5}
                    readOnly
                  />
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
