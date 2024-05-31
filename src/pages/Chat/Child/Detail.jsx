import React from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import AvtCho from "./List/ChatList/avtCho.jpg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DownloadIcon from "@mui/icons-material/Download";
import "./Detail.css";

function Detail() {
  return (
    <Box className="detail" sx={{ flex: 1 }}>
      <Box
        className="user"
        sx={{
          display: "flex",
          padding: "30px 20px",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          borderBottom: "1px solid #dddddd35",
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <img src={AvtCho} alt="avt" style={{ borderRadius: "50%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }} />
        <Typography sx={{ color: "#333", fontWeight: "bold" }}>Con Cho</Typography>
        <Typography sx={{ color: "#666" }}>Hello</Typography>
      </Box>
      <Box
        className="info"
        sx={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "25px",
          flex: 1,
          overflowY: "scroll",
          height: "505px",
          backgroundColor: "#fafafa",
          borderRadius: "8px",
        }}
      >
        <Box className="option">
          <Box className="title">
            <Typography sx={{ color: "#333", fontWeight: "bold" }}>Chat setting</Typography>
            <Box sx={{ cursor: "pointer" }}>
              <KeyboardArrowDownIcon />
            </Box>
          </Box>
          <Box className="photos">
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="avt" />
                <Typography sx={{ color: "#333" }}>Photo 1</Typography>
              </Box>
              <DownloadIcon />
            </Box>
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="avt" />
                <Typography sx={{ color: "#333" }}>Photo 2</Typography>
              </Box>
              <DownloadIcon />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Detail;
