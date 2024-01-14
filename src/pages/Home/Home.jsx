import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import useWorkers from "../../utils/userUtils/workerUtils";
import useJobs from "../../utils/jobUtils/jobUtils";
import Loading from "../../components/Loading/Loading";

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

  return (
    <>
      <br />
      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          width: "95%",
          margin: "auto",
          marginTop: "5%",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
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
            <Grid container spacing={5}>
              {workers
                .slice(-7)
                .reverse()
                .map((card, index) => (
                  <Grid item key={index}>
                    <Card
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                        width: "150px",
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        to={`/worker/${card._id.$oid}`}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={
                            card.avatar === ""
                              ? "https://www.homekeepermaidagency.com/wp-content/uploads/2019/10/male-avatar.png"
                              : card.avatar
                          }
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
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      <div
        style={{
          borderTop: "2px solid black",
          width: "20%",
          margin: "10px auto",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      ></div>

      <Card
        sx={{
          backgroundColor: "white",
          borderRadius: "20px",
          width: "95%",
          margin: "auto",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
        }}
      >
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
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
            <Grid container spacing={5}>
              {jobs
                .slice(-6)
                .reverse()
                .map((card, index) => (
                  <Grid item xs={6} sm={3} md={2} key={index}>
                    <Card
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <CardActionArea
                        component={Link}
                        to={`/job/${card._id.$oid}`}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={
                            card.image === ""
                              ? "https://lpm.ulm.ac.id/image/desain/empty.jpg"
                              : card.image
                          }
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
                          <Typography
                            sx={{
                              fontSize: 12,
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
                            {card.datetime}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          )}
        </CardContent>
      </Card>
      <div
        style={{
          borderTop: "2px solid black",
          width: "20%",
          margin: "10px auto",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      ></div>
      <br />
    </>
  );
}

export default Home;
