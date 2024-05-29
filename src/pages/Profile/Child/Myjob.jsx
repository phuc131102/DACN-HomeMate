import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
} from "@mui/material";
import Loading from "../../../components/Loading/Loading";
import { myJob } from "../../../services/jobAPI";
import jobEmpty from "../../../assets/job_empty.png";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function MyJob(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [userData, setUserData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    if (userData && userData.id && prop.id) {
      const fetchData = async () => {
        try {
          const fetchedJobs = await myJob(prop.id);
          setJobs(fetchedJobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userData, prop.id]);

  const sortedJobs = jobs.sort((a, b) => {
    const statusOrder = {
      "In Progress": 1,
      Full: 2,
      Available: 3,
      Closed: 4,
    };

    return statusOrder[a.status] - statusOrder[b.status];
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = sortedJobs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
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
    <>
      <br />
      {jobs.length === 0 ? (
        "Not create any job yet."
      ) : (
        <Grid container spacing={5}>
          {currentJobs.map((card, index) => (
            <Grid item xs={6} key={index}>
              <Card
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                <CardActionArea component={Link} to={`/job/${card._id.$oid}`}>
                  <CardMedia
                    component="img"
                    height="150"
                    image={card.image === "" ? jobEmpty : card.image}
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
                      color={
                        card.status === "Available"
                          ? "green"
                          : card.status === "In Progress" ||
                            card.status === "Full"
                          ? "orange"
                          : "red"
                      }
                      gutterBottom
                    >
                      {card.status}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {jobs.length > 4 ? (
        <Pagination
          count={Math.ceil(sortedJobs.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size={isMd ? "large" : "small"}
          color="primary"
          showFirstButton
          showLastButton
          sx={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : null}
      <br />
    </>
  );
}

export default MyJob;
