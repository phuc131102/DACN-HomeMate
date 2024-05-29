import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { allReport } from "../../services/userAPI";
import UserInfo from "../../utils/userUtils/getUserInfo";

const UserListPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const { users, loading } = useUsers();
  const [userData, setUserData] = useState([]);
  const [filterRoleItems, setFilterRoleItems] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading2, setLoading] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedReports = await allReport();
        setReports(fetchedReports);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  if (loading || loading2) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = reports
    .filter((card) => card.block !== true)
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
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ fontSize: 30, marginLeft: "7%" }}
            color="text.primary"
            gutterBottom
          >
            <b>All Reports</b>
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
                <TableCell>Reporter</TableCell>
                <TableCell>Reported Users</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Delete Report?</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentReports.map((user, index) => (
                <TableRow key={index}>
                  <TableCell
                    onClick={() => handleRowClick(user.reporter_id)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <UserInfo userId={user.reporter_id} />
                  </TableCell>
                  <TableCell
                    onClick={() => handleRowClick(user.reported_id)}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#e0e0e0",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <UserInfo userId={user.reported_id} />
                  </TableCell>
                  <TableCell>{user.reason}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ borderRadius: "15px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {reports.filter((card) => card.block !== true).length > 5 && (
        <Pagination
          count={Math.ceil(
            reports.filter((card) => card.block !== true).length / itemsPerPage
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
      )}
      <br />
    </>
  );
};

export default UserListPage;
