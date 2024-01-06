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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import useWorkers from "../../utils/userUtils/workerUtils";
import useJobs from "../../utils/jobUtils/jobUtils";
// import usePlacelist from "../../utils/placeListUtils";
import Loading from "../../components/Loading/Loading";

function Home() {
  const { workers, loading } = useWorkers();
  const { jobs, loadingJob } = useJobs();
  // const { placelist, loadingPlace } = usePlacelist();

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
  // const handleViewWishlist = () => {
  //   localStorage.setItem("activeTab", "wishlist");
  //   navigateAndReload("/wishlist");
  // };

  if (loading) {
    return <Loading />;
  }
  if (loadingJob) {
    return <Loading />;
  }
  // if (loadingPlace) {
  //   return <Loading />;
  // }

  return (
    <>
      <br />
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
              <PlayArrowIcon />
              &nbsp;New Worker
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
                .slice(-6)
                .reverse()
                .map((card, index) => (
                  <Grid item key={index}>
                    <Card
                      sx={{
                        backgroundColor: "white",
                        borderRadius: "20px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
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
                          {/* <Typography
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
                          {card.author}
                        </Typography> */}
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
              <PlayArrowIcon />
              &nbsp;New Job
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
                  <Grid item key={index}>
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

      {/* <Card
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
            <Typography color="text.primary" sx={{ fontSize: 20 }} gutterBottom>
              <PlayArrowIcon />
              {` My Books (${placelist.length})`}
            </Typography>
            {placelist.length === 0 ? null : (
              <Button
                onClick={handleViewPlace}
                variant="text"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                View My Books <NavigateNextIcon />
              </Button>
            )}
          </Grid>
          {placelist.length === 0 ? (
            "No borrowed book available."
          ) : (
            <Grid container spacing={10}>
              {placelist.slice(0, 6).map((card, index) => (
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
                      to={`/bookinfo/${card.id}`}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={card.image}
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
                          {card.author}
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
            <Typography color="text.primary" sx={{ fontSize: 20 }} gutterBottom>
              <PlayArrowIcon />
              {` Wishlist (${wishlist.length})`}
            </Typography>
            {wishlist.length === 0 ? null : (
              <Button
                onClick={handleViewWishlist}
                variant="text"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                View Wishlist <NavigateNextIcon />
              </Button>
            )}
          </Grid>
          {wishlist.length === 0 ? (
            "No wishlist book available."
          ) : (
            <Grid container spacing={10}>
              {wishlist.slice(0, 6).map((card, index) => (
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
                      to={`/bookinfo/${card._id.$oid}`}
                    >
                      <CardMedia
                        component="img"
                        height="250"
                        image={card.image}
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
                          {card.author}
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
          <Typography color="text.primary" sx={{ fontSize: 20 }} gutterBottom>
            <PlayArrowIcon />
            &nbsp;Categories
          </Typography>
          <Grid container spacing={5}>
            {categoryData.map((card, index) => (
              <Grid item xs={6} sm={3} md={2} key={index}>
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <CardActionArea component={Link} to={`/category/${card.id}`}>
                    <CardMedia
                      component="img"
                      height="150"
                      image={card.image}
                      alt={card.title}
                    />
                    <Typography
                      gutterBottom
                      variant="h4"
                      sx={{
                        position: "absolute",
                        top: "40%",
                        width: "100%",
                        textAlign: "center",
                        color: "white",
                        backgroundColor: "none",
                        fontFamily: "Comic Sans MS",
                        textShadow: "0 0 5px black",
                      }}
                    >
                      {card.title}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card> */}
      <br />
    </>
  );
}

export default Home;
