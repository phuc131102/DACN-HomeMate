import React, { useState, useEffect } from "react";
import { Grid, Typography, CardContent, Pagination, Box } from "@mui/material";

import useWorkers from "../../utils/userUtils/workerUtils";
import Loading from "../../components/Loading/Loading";
import WorkerCard from "./Child/WorkerCard";

function Worker() {
  const { workers, loading } = useWorkers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = workers
    .filter((card) => card.status === "Available")
    .slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
          marginTop: "7%",
        }}
      >
        <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
          &nbsp;<b>All Worker</b>
        </Typography>
        <CardContent>
          <Box sx={{ width: "80%", margin: "auto" }}>
            <Grid container spacing={5}>
              {currentWorkers.map((card, index) => (
                <Grid item xs={12} sm={12} md={3} key={index}>
                  {console.log(card)}

                  <WorkerCard card={card} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
        {/* <WorkerCard /> */}
      </Box>
      {workers.filter((card) => card.status === "Available").length > 8 ? (
        <Pagination
          count={Math.ceil(
            workers.filter((card) => card.status === "Available").length /
              itemsPerPage
          )}
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
