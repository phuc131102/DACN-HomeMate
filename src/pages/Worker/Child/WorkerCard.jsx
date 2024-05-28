import React, { useState } from "react";
import { Typography, Box, Button, Rating, Modal, Stack } from "@mui/material";
import "./WorkerCard.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";
import avtEmpty from "../../../assets/avt_empty.png";

function WorkerCard(prop) {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const styles = {
    button: {
      backgroundColor: "green",
      color: "#fff",
      fontWeight: 600,
      borderRadius: 15,
      maxWidth: "500px",
      marginRight: "10px",
      minWidth: "150px",
      padding: "5px 10px",
      fontSize: "1.2rem",
    },
    buttonRemove: {
      backgroundColor: "red",
      color: "#fff",
      fontWeight: 600,

      borderRadius: 15,
      maxWidth: "500px",
      marginRight: "10px",
      minWidth: "150px",
      padding: "5px 10px",
      fontSize: "1.2rem",
    },
    modal: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };

  const navigate = useNavigate();
  const handleGuest = () => {
    navigate("/signin");
  };

  return (
    <>
      <Box className="container">
        <Box className="cardn">
          <Box className="img-box">
            <img
              src={prop.card.avatar ? prop.card.avatar : avtEmpty}
              alt="pic"
            />
          </Box>

          <Box className="content">
            <Typography
              variant="h6"
              sx={{ wordBreak: "break-word" }}
              gutterBottom
            >
              {prop.card.name}
            </Typography>
            <Box sx={{ width: "90%", margin: "auto" }}>
              {!prop.home ? (
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: "break-word",
                  }}
                  gutterBottom
                >
                  {prop.card.email}
                </Typography>
              ) : (
                <Rating
                  name="read-only"
                  value={prop.rating}
                  precision={0.5}
                  readOnly
                />
              )}
              {prop.card.phone_num !== "" && !prop.home ? (
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: "break-word",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  gutterBottom
                >
                  <LocalPhoneIcon /> {prop.card.phone_num}
                </Typography>
              ) : (
                <></>
              )}
              <Box sx={{ padding: "20px" }}>
                <Button
                  variant="outlined"
                  onClick={
                    prop.userData
                      ? () => navigate(`/worker/${prop.card._id.$oid}`)
                      : handleOpenModal
                  }
                >
                  more info
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="place-book-modal"
        aria-describedby="place-book-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography
            id="place-book-modal"
            variant="h5"
            color="error"
            textAlign="center"
          >
            <b>Sign in Required</b>
          </Typography>
          <Typography variant="body1" textAlign="center" marginTop={2}>
            Please sign in to view this worker!
          </Typography>
          <Stack direction="row" justifyContent="center" marginTop={4}>
            <Button
              variant="contained"
              sx={styles.buttonRemove}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleGuest}
            >
              Sign in
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default WorkerCard;
