import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { my_worker } from "../../../services/jobAPI";
import CircularProgress from "@mui/material/CircularProgress";
import avtEmpty from "../../../assets/avt_empty.png";

function YourWorker() {
  const [userData, setUserData] = useState([]);
  const [workers, setWorkers] = useState([]);
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
          const fetchedJobs = await my_worker(userData.id);
          setWorkers(fetchedJobs);
        } catch (error) {
          console.error("Error fetching worker:", error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [userData]);
  console.log(workers);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorker = workers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (value) => {
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
    <Box>
      {currentWorker.length === 0 ? (
        "Not has any worker yet."
      ) : (
        <Box>
          <Grid container spacing={5}>
            {currentWorker.map((card, index) => (
              <Grid item xs={6} key={index}>
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                    width:"250px"
                  }}
                >
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  ></Grid>
                  <CardActionArea
                    component={Link}
                    to={`/worker/${card.worker._id.$oid}`}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={card.worker.avatar === "" ? avtEmpty : card.worker.avatar}
                      alt={card.name}
                      sx={{objectFit:"cover"}}
                    />
                    <CardContent>
                      <Typography
                        sx={{
                          fontSize: 18,
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
                        <b>{card.worker.name}</b>
                      </Typography>
                      {userData.role === "Homeowner" ? (
                        <Typography
                          sx={{
                            fontSize: 14,
                            textAlign: "center",
                            lineHeight: "1.2",
                            maxHeight: "1.2em",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "block",
                            wordBreak:"break-word"
                          }}
                          color={card.status === "Working" ? "green" : "red"}
                          gutterBottom
                        >
                          {card.status}
                        </Typography>
                      ) : null}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {Math.ceil(workers.length / itemsPerPage) > 1 ? (
        <Pagination
          count={Math.ceil(workers.length / itemsPerPage)}
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
    </Box>
  );
}

export default YourWorker;