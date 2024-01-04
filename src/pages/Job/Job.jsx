import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Pagination,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

import useJobs from "../../utils/jobUtils/jobUtils";
import Loading from "../../components/Loading/Loading";

function Job() {
  const { jobs, loadingJob } = useJobs();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  if (loadingJob) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = jobs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <br />
      <Grid container sx={{ width: "95%", margin: "auto" }}>
        <Button
          variant="contained"
          sx={{ width: "15%", marginLeft: "auto", borderRadius: "15px" }}
          // onClick={handleViewJob}
        >
          Create New Job
        </Button>
      </Grid>

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
            {currentJobs.map((card, index) => (
              <Grid item key={index}>
                <Card
                  sx={{
                    backgroundColor: "white",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <CardActionArea
                  // component={Link}
                  // to={`/bookinfo/${card._id.$oid}`}
                  >
                    <CardMedia
                      component="img"
                      height="150"
                      image={
                        card.image === ""
                          ? "https://lpm.ulm.ac.id/image/desain/empty.jpg"
                          : card.image
                      }
                      alt={card.position}
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
                        {card.position}
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
        </CardContent>
      </Card>
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
      <br />
    </>
  );
}

export default Job;
