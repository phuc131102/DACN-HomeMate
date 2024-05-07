import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import useWorkers from "../../utils/userUtils/workerUtils";
import useJobs from "../../utils/jobUtils/jobUtils";
import Loading from "../../components/Loading/Loading";
import avtEmpty from "../../assets/avt_empty.png";
import NewCard from "../Job/Child/NewCard";
import Hero from "./Child/Hero";
import WorkerCard from "../Worker/Child/WorkerCard";

function Home() {
  const { workers, loading } = useWorkers();
  const { jobs, loadingJob } = useJobs();

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
  const jobLength = jobs.length;
  const workerLength = workers.length;
  const jobArray = jobs
    .filter((card) => card.status !== "In Progress")
    .slice(-4)
    .reverse();
  return (
    <>
      <br />
      <Hero jobLength={jobLength} workerLength={workerLength} />
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
              .slice(-4)
              .reverse()
              .map((card, index) => (
                <Grid item key={index}>
                  {/* <Card
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                        width: "160px",
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        to={`/worker/${card._id.$oid}`}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={card.avatar === "" ? avtEmpty : card.avatar}
                          alt={card.name}
                        />
                        <CardContent>
                          <Typography
                            sx={{
                              fontSize: 16,
                              textAlign: "center",
                              lineHeight: "1.2",
                              maxHeight: "1.2em",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              display: "block",
                            }}
                            color="text.primary"
                            gutterBottom
                          >
                            {card.name}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card> */}
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
