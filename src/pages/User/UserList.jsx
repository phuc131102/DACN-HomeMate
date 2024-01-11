import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import useUsers from "../../utils/userUtils/userUtils";
import Loading from "../../components/Loading/Loading";

const UserListPage = () => {
  const { users, loading } = useUsers();

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          width: "80vw",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          marginTop: "5%",
          marginBottom: "5%",
          border: "2px solid #000",
          borderRadius: "20px",
          background: "#fff",
          color: "#000",
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {currentUsers.map((card, index) => (
          <Grid item xs={12} key={index}>
            <Card
              style={{
                width: "40vw",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                marginTop: "1%",
                marginBottom: "2%",
                border: "2px solid #000",
                borderRadius: "20px",
                background: "#fff",
                color: "#000",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "16px",
              }}
            >
              <CardContent style={{ textAlign: "center" }}>
                <Avatar src={card.avatar} alt={card.name} />
                <Typography variant="h6">{card.name}</Typography>
                <Typography>Email: {card.email}</Typography>
                <Typography>Address: {card.address}</Typography>
                <Typography>Phone Number: {card.phone_num}</Typography>
                <Typography>Role: {card.role}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil(users.length / itemsPerPage)}
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
};
export default UserListPage;
