import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import dayjs from "dayjs";

export default function RightCvComponent(comp) {
  return (
    <>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="body1"
              sx={{
                margin: "0",
                minWidth: "10%",
                fontSize: 20,
              }}
            >
              {comp.comp.certificateName}
            </Typography>

            <Grid item xs={12}>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                }}
              >
                {comp.comp.intro}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  fontWeight: "bold",
                }}
              >
                From:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  fontWeight: "bold",
                }}
              >
                From:
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            {comp.comp.expirationDate !== null ? (
              <>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontWeight: "bold",
                    }}
                  >
                    To:
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                    }}
                  >
                    {dayjs(comp.comp.expirationDate).format("MMMM D YYYY")}
                  </Typography>
                </Grid>
              </>
            ) : (
              ""
            )}
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  fontWeight: "bold",
                }}
              >
                Link:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  wordWrap: "break-word",
                }}
              >
                {comp.comp.link}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  fontWeight: "bold",
                }}
              >
                Detail:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  wordWrap: "break-word",
                }}
              >
                {comp.comp.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
