import React from "react";
import { Typography, Box, Button } from "@mui/material";
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
            <Typography
              variant="body1"
              sx={{
                wordBreak: "break-word",
              }}
              gutterBottom
            >
              Email:{prop.card.email}
            </Typography>
            {prop.card.phone_num !== "" ? (
              <Typography
                variant="body1"
                sx={{
                  wordBreak: "break-word",
                  display:"flex",
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
                onClick={() => navigate(`/worker/${prop.card._id.$oid}`)}
              >
                more infor
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default WorkerCard;
