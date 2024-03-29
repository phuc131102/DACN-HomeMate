import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Paper,
  Pagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUsers from "../../utils/userUtils/userUtils";
import Loading from "../../components/Loading/Loading";

const UserListPage = () => {
  const { users, loading } = useUsers();

  const navigate = useNavigate();

  const itemsPerPage = 5;
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

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          width: "80vw",
          margin: "auto",
          marginTop: "7%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user, index) => (
              <TableRow
                key={index}
                onClick={() => handleRowClick(user._id.$oid)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                    cursor: "pointer",
                  },
                }}
              >
                <TableCell>
                  <Avatar src={user.avatar} alt={user.name} />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.address === "" ? "N/A" : user.address}
                </TableCell>
                <TableCell>
                  {user.phone_num === "" ? "N/A" : user.phone_num}
                </TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
