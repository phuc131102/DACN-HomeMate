import React, { useState, useEffect } from "react";
import { Grid, Typography, CardContent, Pagination, Box } from "@mui/material";

import useWorkers from "../../utils/userUtils/workerUtils";
import Loading from "../../components/Loading/Loading";
import WorkerCard from "./Child/WorkerCard";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Worker() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { workers, loading } = useWorkers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  console.log(workers);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWorkers = workers
    .filter((card) => card.status === "Available" || card.status === "Working")
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
          marginTop: isMd ? "7%" : "20%",
        }}
      >
        <Typography
          sx={{ fontSize: 30, textAlign: "center" }}
          color="text.primary"
          gutterBottom
        >
          <b>All Worker</b>
        </Typography>

        <Box
          sx={{
            width: "80%",
            margin: "auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={5}>
            {currentWorkers.map((card, index) => (
              <Grid item xs={12} sm={12} md={3} key={index}>
                <WorkerCard
                  card={card}
                  userData={
                    localStorage.getItem("userData") === null ? false : true
                  }
                />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* <WorkerCard /> */}
      </Box>
      {workers.length > 8 ? (
        <Pagination
          count={Math.ceil(
            workers.filter(
              (card) => card.status === "Available" || card.status === "Working"
            ).length / itemsPerPage
          )}
          page={currentPage}
          onChange={handlePageChange}
          shape="rounded"
          size={isMd ? "large" : "small"}
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
