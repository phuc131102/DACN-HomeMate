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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";

const UserListPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { users, loading } = useUsers();
  console.log(users)
  const [userData, setUserData] = useState([]);
  const [filterRoleItems, setFilterRoleItems] = useState([]);
  const [chooseRole, setChooseRole] = useState([]);
  const role = [{ name: "Worker" }, { name: "Homeowner" }, { name: "Admin" }];
  // console.log(userData.id)
  // const handleAddNewContact = async () => {
  //   const AddNewContact = async (id) => {
  //     await setDoc(doc(db, "contacts", id), {
  //       chat: [],
  //     });
  //   };
  //   users.forEach((element) => {
  //     AddNewContact(element._id.$oid)
  //   });
  // };
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);
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
    setCurrentPage(1);
  }, [chooseRole]);

  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filterRoleItems
    .filter((card) => card.block !== true)
    .slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleAddUser = () => {
    navigate("/add-user");
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
          {/* <Button onClick={handleAddNewContact}> add</Button> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMd ? "" : "column",
              justifyContent: isMd ? "space-between" : "",
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
            {userData.role === "Admin" ? (
              <Button
                variant="contained"
                sx={{
                  width: "300px",
                  marginTop: isMd ? "" : "20px",
                  // marginLeft: "auto",
                  borderRadius: "15px",
                }}
                onClick={handleAddUser}
              >
                Create New User
              </Button>
            ) : null}
          </Box>
        </Box>

        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontSize: 30, marginLeft: "7%" }}
            color="text.primary"
            gutterBottom
          >
            <b>All User</b>
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
      <Pagination
        count={Math.ceil(
          filterRoleItems.filter((card) => card.block !== true).length /
            itemsPerPage
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
          display: "flex",
          justifyContent: "center",
        }}
      />
      <br />
    </>
  );
};

export default UserListPage;
