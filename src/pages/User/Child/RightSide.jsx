import React from "react";
import {
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function RightSide(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  const avaiJob = prop.jobs.filter((item) => item.status === "Available");
  const inPorsJob = prop.jobs.filter((item) => item.status === "In Progress");
  const ClosedJob = prop.jobs.filter((item) => item.status === "Closed");

  const workers = prop.users.filter((item) => item.role === "Worker");
  const avaiWorker = workers.filter((item) => item.status === "Available");
  const workingWorker = workers.filter((item) => item.status === "Working");
  return (
    <Grid
      container
      xs={12}
      item
      sx={{
        border: isMd?"1px solid linear-gradient(106.37deg,#ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)":"",
        borderRadius: "10px",
        background: isMd?"linear-gradient(106.37deg,#ffe1bc 29.63%,#ffcfd1 51.55%,#f3c6f1 90.85%)":"",
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom:isMd?"":"20px",  
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "1px solid linear-gradient(180deg, #BB67FF 0%, #C484F3 100%)",
            borderRadius: "10px",
            paddingTop:"20px",
            paddingBottom:"20px",
            background: "linear-gradient(180deg, #BB67FF 0%, #C484F3 100%)",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: avaiWorker.length, label: "Available" },
                  { id: 1, value: workingWorker.length, label: "Working" },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={400}
            height={200}
          />
          <Typography sx={{ marginTop: "10px" }}>Worker</Typography>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            border: "1px solid linear-gradient(180deg, #BB67FF 0%, #C484F3 100%)",
            paddingTop:"20px",
            paddingBottom:"20px",
            borderRadius: "10px",
            background: "#FF919D",
          }}
        >
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: avaiJob.length, label: "Available" },
                  { id: 1, value: inPorsJob.length, label: "In Progress" },
                  { id: 2, value: ClosedJob.length, label: "Closed" },
                ],
                innerRadius: 30,
                outerRadius: 100,
                paddingAngle: 5,
                cornerRadius: 5,
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            width={400}
            height={200}
          />
          <Typography sx={{ marginTop: "10px" }}>Jobs</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RightSide;
