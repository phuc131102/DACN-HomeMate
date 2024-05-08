import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Pagination,
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import HomeIcon from '@mui/icons-material/Home';

function InfoBox() {
  return (
    <Box>
      <Grid container xs={12}>
        <Grid item container xs={6}>
          <Grid item xs={12} className="Users" sx={{ marginBottom: "20px" }}>
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#BAB3B3",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "15px",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    gutterBottom
                  >
                    Users
                    <PersonIcon />
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", marginTop: "5px" }}>
                  <Typography variant="h4" gutterBottom>
                    500
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    + 15%
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    since last month
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} className="Worker">
            {" "}
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#BAB3B3",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "15px",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    gutterBottom
                  >
                    Worker
                    <CleaningServicesIcon />
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", marginTop: "5px" }}>
                  <Typography variant="h4" gutterBottom>
                    500
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    + 15%
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    since last month
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item container xs={6}>
          <Grid item xs={12} className="Jobs" sx={{ marginBottom: "20px" }}>
            {" "}
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#BAB3B3",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "15px",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    gutterBottom
                  >
                    Jobs
                    <WorkIcon />
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", marginTop: "5px" }}>
                  <Typography variant="h4" gutterBottom>
                    500
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    + 15%
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    since last month
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} className="HomeOwner">
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                backgroundColor: "#BAB3B3",
              }}
            >
              <Box
                sx={{
                  width: "90%",
                  margin: "auto",
                  marginTop: "15px",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    gutterBottom
                  >
                    HomeOwner
                    <HomeIcon />
                  </Typography>
                </Box>
                <Box sx={{ width: "100%", marginTop: "5px" }}>
                  <Typography variant="h4" gutterBottom>
                    500
                  </Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="body1" gutterBottom>
                    + 15%
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    since last month
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default InfoBox;
