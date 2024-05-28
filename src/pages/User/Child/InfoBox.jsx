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
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import HomeIcon from "@mui/icons-material/Home";
import CountUp from "react-countup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import moment from "moment";

function InfoBox(prop) {
  const countObjectsToday = (prop) => {
    const now = moment().utc();
    const today = now.clone().startOf("day");
    let todayCount = 0;
    prop.forEach((item) => {
      const dateString = item.dt_created.$date; // Accessing $date property
      const date = moment.utc(dateString);
      if (date.isSame(today, "day")) {
        todayCount += 1;
      }
    });

    return todayCount;
  };
  let todayjobs = countObjectsToday(prop.jobs);
  let todayuser = countObjectsToday(prop.users);
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  // console.log(prop.users)
  const worker = prop.users.filter((item) => item.role === "Worker");
  const homwOwner = prop.users.filter((item) => item.role === "Homeowner");
  return (
    <Box>
      <Grid item container xs={12}>
        <Grid item container xs={12}>
          <Grid
            item
            xs={12}
            md={6}
            className="Users"
            sx={{ marginBottom: "20px", marginTop: isMd ? "20px" : "" }}
          >
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                background:
                  "linear-gradient(106.37deg,#ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)",
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
                    <CountUp start={0} end={prop.users.length} duration={3} />
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
                    + {todayuser} users
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    today
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            className="Jobs"
            sx={{ marginBottom: "20px", marginTop: isMd ? "20px" : "" }}
          >
            {" "}
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                background:
                  "linear-gradient(106.37deg,#ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)",
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
                    <CountUp start={0} end={prop.jobs.length} duration={3} />
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
                    + {todayjobs} jobs
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    today
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid
            item
            xs={12}
            md={6}
            className="Worker"
            sx={{ marginBottom: "20px" }}
          >
            {" "}
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                background:
                  "linear-gradient(106.37deg,#ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)",
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
                    <CountUp start={0} end={worker.length} duration={3} />
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
          <Grid
            item
            xs={12}
            md={6}
            className="HomeOwner"
            sx={{ marginBottom: "20px" }}
          >
            <Box
              sx={{
                width: "250px",
                border: "1px solid #BAB3B3",
                margin: "auto",
                height: "150px",
                borderRadius: "10px",
                background:
                  "linear-gradient(106.37deg,#ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)",
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
                    <CountUp start={0} end={homwOwner.length} duration={3} />
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
