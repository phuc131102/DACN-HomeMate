import React from "react";
import { Typography, Box, Button, Rating } from "@mui/material";
import "./WorkerCard.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useNavigate } from "react-router-dom";
import avtEmpty from "../../../assets/avt_empty.png";
import EmailIcon from "@mui/icons-material/Email";
function WorkerCard(prop) {
  const navigate = useNavigate();
  return (
    <Box className="container">
      <Box className="cardn">
        <Box className="img-box">
          <img src={prop.card.avatar ? prop.card.avatar : avtEmpty} alt="pic" />
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
                    : () => navigate(`/signin`)
                }
              >
                more info
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WorkerCard;
