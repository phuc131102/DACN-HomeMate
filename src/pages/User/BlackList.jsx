import React, { useState, useEffect } from "react";
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
  Grid,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useUsers from "../../utils/userUtils/userUtils";
import Loading from "../../components/Loading/Loading";
import UserFilter from "./Child/UserFilter";

const BlackListPage = () => {
  const { users, loading } = useUsers();
  const [filterRoleItems, setFilterRoleItems] = useState([]);
  const [chooseRole, setChooseRole] = useState([]);
  const role = [{ name: "Worker" }, { name: "Homeowner" }, { name: "Admin" }];
  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setFilterRoleItems(users);
  }, [users]);
  useEffect(() => {
    if (chooseRole.length > 0) {
      let tempItems = chooseRole.map((selectedRole) => {
        let temp = users.filter((jobItem) => {
          let tempArray = jobItem.role === selectedRole;
          return tempArray;
        });
        return temp;
      });
      setFilterRoleItems([...new Set(tempItems.flat())]);
    } else {
      setFilterRoleItems(users);
    }
  }, [chooseRole]);
  if (loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filterRoleItems
    .filter((card) => card.block === true)
    .slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <>
      <Box
        sx={{
          width: "95%",
          margin: "auto",
        }}
      >
        <Box sx={{ width: "100%", margin: "auto" }}>
          <Typography sx={{ fontSize: 30 }} color="text.primary" gutterBottom>
            &nbsp;<b>Filter</b>
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: "50px",
              }}
            >
              <Box sx={{ width: "300px" }}>
                <UserFilter
                  option={role}
                  chooseOption={chooseRole}
                  setChooseOption={setChooseRole}
                  label="Filter Role"
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontSize: 30, marginLeft: "7%" }}
            color="text.primary"
            gutterBottom
          >
            <b>Blocked User</b>
          </Typography>
        </Grid>
        <TableContainer
          component={Paper}
          sx={{
            width: "80vw",
            margin: "auto",
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
      </Box>
      {users.filter((card) => card.block === true).length > 5 ? (
        <Pagination
          count={Math.ceil(
            users.filter((card) => card.block === true).length / itemsPerPage
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
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : null}
      <br />
    </>
  );
};

export default BlackListPage;
