import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";

import useWorkers from "../../utils/userUtils/workerUtils";
import Loading from "../../components/Loading/Loading";
import avtEmpty from "../../assets/avt_empty.png";

function Worker() {
  const { workers, loading } = useWorkers();
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = workers.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <br />
      <div
        style={{
          margin: "10px auto",
          marginTop: "40px",
          marginBottom: "40px",
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
          <Grid container spacing={5}>
            {currentWorkers.map((card, index) => (
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
                        <b>{card.name}</b>
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
                          }}
                          color={card.status !== "Hired" ? "green" : "red"}
                          gutterBottom
                        >
                          {card.status !== "Hired" ? "Available" : "Hired"}
                        </Typography>
                      ) : null}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      {workers.length > 12 ? (
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
            marginBottom: "20px",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : (
        <div
          style={{
            margin: "10px auto",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        ></div>
      )}
      <br />
    </>
  );
}

export default Worker;
