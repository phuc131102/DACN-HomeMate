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
import InfoBox from "./InfoBox";
import RightSide from "./RightSide";
function Dashboard(prop) {
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to dashboard
          </Typography>
        </Grid>
        <Grid item container xs={12} className="DashboardDiagram">
          <Grid container item xs={4} className="LeftSide">
            <InfoBox users={prop.users} jobs={prop.jobs} />
          </Grid>
          <Grid container item xs={8} className="RightSide">
            <RightSide users={prop.users} jobs={prop.jobs} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
