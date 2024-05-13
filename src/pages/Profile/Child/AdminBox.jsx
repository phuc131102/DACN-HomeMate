import React from "react";
import {

  Grid,
  Box,
} from "@mui/material";
import InfoBox from "../../User/Child/InfoBox";
import CircularProgress from "@mui/material/CircularProgress";
import useJobs from "../../../utils/jobUtils/jobUtils";
import useUsers from "../../../utils/userUtils/userUtils";

function AdminBox() {
  const { users, loading } = useUsers();
  const { jobs, loadingJob } = useJobs();

  if (loading && loadingJob) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  return (
    <Box
      sx={{
        width: "90%",
        margin:"auto",
        marginTop:" 20px",
        marginBottom:"20px"
      }}
    >
      <Grid container>

        <Grid item container xs={12} className="DashboardDiagram">
          <Grid container item xs={12} className="LeftSide">
            <InfoBox users={users} jobs={jobs} />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminBox;
