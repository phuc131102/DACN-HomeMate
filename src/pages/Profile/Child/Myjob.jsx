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

function MyJob() {
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
    if (userData && userData.id) {
      const fetchData = async () => {
        try {
          const fetchedJobs = await myJob(userData.id);
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
  }, [userData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <br />
      {currentJobs.length === 0 ? (
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
                        card.status === "Available" || card.status === "Working"
                          ? "green"
                          : card.status === "In Progress"
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

      {Math.ceil(jobs.length / itemsPerPage) > 1 ? (
        <Pagination
          count={Math.ceil(jobs.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size="large"
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
