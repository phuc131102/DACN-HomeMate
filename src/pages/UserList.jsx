import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const UserListPage = () => {
  const users = [
    {
      id: 1,
      username: "Viet Thang",
      email: "thang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Homeowner",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      username: "Thanh Phuc",
      email: "phuc@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      username: "Minh Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      username: "Minh Tri",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      username: "Tran Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      username: "Hao",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      username: "Viet",
      email: "thang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Homeowner",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      username: "Thanh",
      email: "phuc@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      username: "Minh Da",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 10,
      username: "Min",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 11,
      username: "Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 12,
      username: "inh Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 13,
      username: "Viet Thang",
      email: "thang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Homeowner",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 14,
      username: "Thanh Phuc",
      email: "phuc@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 15,
      username: "Minh Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 16,
      username: "Minh Tri",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 17,
      username: "Tran Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 18,
      username: "Hao",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 19,
      username: "Viet",
      email: "thang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Homeowner",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 20,
      username: "Thành",
      email: "phuc@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 21,
      username: "Minh Da",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 22,
      username: "Min",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 23,
      username: "Dang",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 24,
      username: "in",
      email: "dang@example.com",
      address: "aaaaaa",
      phonenum: "232322",
      role: "Worker",
      avatar: "https://via.placeholder.com/150",
    },
  ];
  const maxUsersPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastUser = currentPage * maxUsersPerPage;
  const indexOfFirstUser = indexOfLastUser - maxUsersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / maxUsersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const goToPage = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
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
      {currentUsers.map((user) => (
        <Grid item xs={12} key={user.id}>
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
              <Avatar src={user.avatar} alt={user.username} />
              <Typography variant="h6">{user.username}</Typography>
              <Typography>Email: {user.email}</Typography>
              <Typography>Address: {user.address}</Typography>
              <Typography>Phone Number: {user.phonenum}</Typography>
              <Typography>Role: {user.role}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
      <Grid item xs={12}>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                color: "red",
                borderColor: "black",
                fontWeight: "bold",
              },
            }}
            onClick={prevPage}
          >
            Previous Page
          </Button>
          {Array.from({ length: Math.min(totalPages, 1) }, (_, i) => (
            <Button
              key={i + 1}
              variant="outlined"
              onClick={() => goToPage(i + 1)}
              sx={{
                "&:hover": {
                  color: "red",
                  borderColor: "black",
                  fontWeight: "bold",
                },
              }}
            >
              {i + 1}
            </Button>
          ))}
          {totalPages > 4 && (
            <>
              <Typography>...</Typography>
              <Button variant="outlined" onClick={() => goToPage(totalPages)}>
                {totalPages}
              </Button>
            </>
          )}
          <Button
            variant="outlined"
            sx={{
              "&:hover": {
                color: "red",
                borderColor: "black",
                fontWeight: "bold",
              },
            }}
            onClick={nextPage}
          >
            Next Page
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default UserListPage;
