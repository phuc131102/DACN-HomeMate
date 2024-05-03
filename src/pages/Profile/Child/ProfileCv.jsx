import React, { useState, useEffect } from "react";

import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ViewCv from "../../ViewCv/ViewCv";
function ProfileCv(prop) {
  return (
    <>
      {prop.userInfo.role === "Worker" ? (
        <Grid container>
          <Grid container item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              {prop.cvinfo.message === "CV not found" ? (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={prop.handleCreateCv}
                    sx={{ marginTop: "15px" }}
                  >
                    {" "}
                    Create CV
                  </Button>
                </>
              ) : (
                <>
                  <Grid container>
                    <Grid item xs={12}>
                      <ViewCv cvinfo={prop.cvinfo.data} />
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      ) : null}
      {prop.userInfo.role === "Worker" ? (
        prop.cvinfo.message === "CV not found" ? (
          <></>
        ) : (
          <Grid container item xs={12} sx={{ marginBottom: "20px" }}>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
              <Button
                size="large"
                variant="contained"
                color="error"
                onClick={(e) => prop.handleCvDelete()}
                sx={{ marginTop: "15px" }}
              >
                {" "}
                Delete CV
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                size="large"
                variant="contained"
                onClick={prop.handleUpdateCv}
                sx={{ marginTop: "15px" }}
              >
                {" "}
                Update CV
              </Button>
            </Grid>
          </Grid>
        )
      ) : null}
    </>
  );
}

export default ProfileCv;
