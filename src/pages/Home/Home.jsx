import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import useWorkers from "../../utils/userUtils/workerUtils";
import useJobs from "../../utils/jobUtils/jobUtils";
import Loading from "../../components/Loading/Loading";
import NewCard from "../Job/Child/NewCard";
import Hero from "./Child/Hero";
import WorkerCard from "../Worker/Child/WorkerCard";
import useOwners from "../../utils/userUtils/ownerUtils";
import WokerGuide from "./Child/WokerGuide";
import FindWorker from "./Child/FindWorker";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function Home() {
  const { workers, loading } = useWorkers();
  const { jobs, loadingJob } = useJobs();
  const { owners, loadingOwners } = useOwners();

  const navigate = useNavigate();

  const navigateAndReload = (path) => {
    navigate(path);
    window.location.reload();
  };

  const handleViewAll = () => {
    localStorage.setItem("activeTab", "worker");
    navigateAndReload("/worker");
  };
  const handleViewJob = () => {
    localStorage.setItem("activeTab", "job");
    navigateAndReload("/job");
  };

  if (loading) {
    return <Loading />;
  }
  if (loadingJob) {
    return <Loading />;
  }
  if (loadingOwners) {
    return <Loading />;
  }

  const jobArray = jobs
    .filter((card) => card.status === "Available")
    .slice(-4)
    .reverse();
  const jobLength = jobs.filter((card) => card.status === "Available").length;
  const workerLength = workers.filter(
    (card) => card.status === "Available"
  ).length;

  const calculateAverage = (ratings) => {
    if (ratings.length === 0) return 0; // Handle empty rating arrays
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  };

  return (
    <>
      <br />
      <Hero
        jobLength={jobLength}
        workerLength={workerLength}
        ownerLength={owners}
      />

      <Box
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            <AutoAwesomeIcon sx={{ color: "red" }} fontSize="large" />
            &nbsp;<b>Hot Worker</b>&nbsp;
            <AutoAwesomeIcon sx={{ color: "red" }} fontSize="large" />
          </Typography>
        </Grid>
        {workers.length === 0 ? (
          "No worker available"
        ) : (
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {workers
              .filter((card) => card.rating.length)
              .sort(
                (a, b) =>
                  calculateAverage(b.rating) - calculateAverage(a.rating)
              )
              .slice(0, 4)
              .map((card, index) => (
                <Grid item key={index}>
                  <WorkerCard
                    card={card}
                    rating={calculateAverage(card.rating)}
                    home={true}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>
      <div
        style={{
          borderTop: "2px solid black",
          width: "20%",
          margin: "10px auto",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      ></div>

      <WokerGuide />
      <Box
        sx={{
          width: "80%",
          margin: "auto",
          marginTop: "2%",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            &nbsp;<b>New Worker</b>
          </Typography>
          {workers.length === 0 ? null : (
            <Button
              onClick={handleViewAll}
              variant="text"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View All Workers <NavigateNextIcon />
            </Button>
          )}
        </Grid>
        {workers.length === 0 ? (
          "No worker available"
        ) : (
          <Grid
            container
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            {workers
              .filter((card) => card.status === "Available")
              .slice(-4)
              .reverse()
              .map((card, index) => (
                <Grid item key={index}>
                  <WorkerCard card={card} />
                </Grid>
              ))}
          </Grid>
        )}
      </Box>

      <div
        style={{
          borderTop: "2px solid black",
          width: "20%",
          margin: "10px auto",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      ></div>
      <FindWorker />
      <Box
        sx={{
          width: "80%",
          margin: "auto",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            &nbsp;<b>New Job</b>
          </Typography>
          {jobs.length === 0 ? null : (
            <Button
              onClick={handleViewJob}
              variant="text"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              View All Jobs <NavigateNextIcon />
            </Button>
          )}
        </Grid>
        {jobs.length === 0 ? (
          "No job available"
        ) : (
          <Grid container sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ marginTop: "80px", width: "100%" }}>
              <NewCard currentJobs={jobArray} />
            </Box>
          </Grid>
        )}
      </Box>
      <div
        style={{
          margin: "10px auto",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      ></div>
      <br />
    </>
  );
}

export default Home;
