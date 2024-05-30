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
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { reject_cccd, verify_list } from "../../services/userAPI";
import UserInfo from "../../utils/userUtils/getUserInfo";

const VerifyPage = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [verify, setVerify] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedVerify = await verify_list();
        setVerify(fetchedVerify);
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

  if (loading) {
    return <Loading />;
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVerify = verify.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleRowClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleReject = async (id) => {
    try {
      const deletionMessage = await reject_cccd(id);
      window.location.reload();
      console.log(deletionMessage);
    } catch (error) {
      console.error("Error:", error.message);
    }
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
            <b>All Verification Waiting</b>
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
                <TableCell>Username</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>ID Number</TableCell>
                <TableCell>ID Image</TableCell>
                <TableCell>Verify Account?</TableCell>
                <TableCell>Reject ID?</TableCell>
              </TableRow>
            </TableHead>
            {currentVerify?.length !== 0 ? (
              <TableBody>
                {currentVerify.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.cccd_num}</TableCell>
                    <TableCell
                      onClick={() => handleClickOpen()}
                      sx={{
                        "&:hover": {
                          backgroundColor: "#e0e0e0",
                          cursor: "pointer",
                        },
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        style={{ width: "500px" }}
                        src={user.cccd_image}
                        alt={user.name}
                      />
                    </TableCell>
                    <Dialog open={open} onClose={handleClose} maxWidth="">
                      <DialogTitle>
                        <>
                          <Typography
                            sx={{ fontSize: "20px", textAlign: "center" }}
                          >
                            ID Number: <b>{user.cccd_num}</b>
                          </Typography>
                          <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                              position: "absolute",
                              right: 8,
                              top: 8,
                              color: (theme) => theme.palette.grey[500],
                            }}
                          >
                            <CloseIcon />
                          </IconButton>
                        </>
                      </DialogTitle>
                      <DialogContent dividers>
                        <img
                          src={user.cccd_image}
                          alt={user.name}
                          style={{ width: "100%" }}
                        />
                      </DialogContent>
                    </Dialog>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ borderRadius: "15px" }}
                        // onClick={() => {
                        //   handleDeleteReport(user._id.$oid);
                        // }}
                      >
                        Verify
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ borderRadius: "15px" }}
                        onClick={() => {
                          handleReject(user._id.$oid);
                        }}
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography>No Report Found.</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
      {verify.length > 5 && (
        <Pagination
          count={Math.ceil(verify.length / itemsPerPage)}
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

export default VerifyPage;
