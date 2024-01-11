import React, { useState } from "react";
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

function Worker() {
  const { workers, loading } = useWorkers();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
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
      <br />
    </>
  );
}

export default Worker;
