import React, { useState } from "react";

import { Grid, Button, Typography, Box, Modal, Stack } from "@mui/material";
import ViewCv from "../../ViewCv/ViewCv";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function ProfileCv(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
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
    modalRating: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMd ? 1000 : "90%",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
    },
  };
  return (
    <>
      {prop.userInfo.role === "Worker" ? (
        <Grid container>
          <Grid container item xs={12}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              {prop.cvinfo.message === "CV not found" ? (
                <>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={prop.handleCreateCv}
                    sx={{ marginTop: "15px" }}
                    disabled={
                      prop.userInfo.block ||
                      prop.userInfo.status === "Pending" ||
                      prop.userInfo.status === "Rejected"
                        ? true
                        : false
                    }
                  >
                    {" "}
                    Create CV
                  </Button>
                </>
              ) : (
                <>
                  <Grid container>
                    <Grid item xs={12}>
                      <ViewCv cvinfo={prop.cvinfo.data} />
                    </Grid>
                  </Grid>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      ) : null}
      {prop.userInfo.role === "Worker" ? (
        prop.cvinfo.message === "CV not found" ? (
          <></>
        ) : (
          <Grid container item xs={12} sx={{ marginBottom: "20px" }}>
            {isMd && <Grid item xs={6}></Grid>}
            <Grid item xs={isMd ? 3 : 6}>
              <Button
                size="large"
                variant="contained"
                color="error"
                onClick={handleOpenModal}
                sx={{ marginTop: "15px" }}
                disabled={prop.userInfo.block ? true : false}
              >
                {" "}
                Delete CV
              </Button>
            </Grid>
            <Grid item xs={isMd ? 3 : 6}>
              <Button
                size="large"
                variant="contained"
                onClick={prop.handleUpdateCv}
                sx={{ marginTop: "15px" }}
                disabled={prop.userInfo.block ? true : false}
              >
                {" "}
                Update CV
              </Button>
            </Grid>
          </Grid>
        )
      ) : null}
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="place-book-modal"
        aria-describedby="place-book-modal-description"
      >
        <Box sx={styles.modal}>
          <Typography id="place-book-modal" variant="h5" textAlign="center">
            Confirm Deletion
          </Typography>
          <Typography variant="body1" textAlign="center" marginTop={2}>
            Are you sure you want to delete this CV?
          </Typography>
          <Stack direction="row" justifyContent="center" marginTop={4}>
            <Button
              variant="contained"
              sx={styles.buttonRemove}
              onClick={(e) => prop.handleCvDelete()}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              sx={styles.button}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

export default ProfileCv;
