import React from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  duration,
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
        }}
      >
        <img src={AvtCho} alt="avt" />
        <Typography sx={{ color: "white" }}>Con Cho</Typography>
        <Typography sx={{ color: "white" }}>Hello</Typography>
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
          height:"505px"
        }}
      >
        <Box className="option">
          <Box className="title">
            <Typography sx={{ color: "white" }}>Chat setting</Typography>
            <Box sx={{ cursor: "pointer" }}>
              <KeyboardArrowUpIcon sx={{ color: "white" }} />
            </Box>
          </Box>
        </Box>

        <Box className="option">
          <Box className="title">
            <Typography sx={{ color: "white" }}>Privacy & Help</Typography>
            <Box sx={{ cursor: "pointer" }}>
              <KeyboardArrowUpIcon sx={{ color: "white" }} />
            </Box>
          </Box>
        </Box>

        <Box className="option">
          <Box className="title">
            <Typography sx={{ color: "white" }}>Shared Photos</Typography>
            <Box sx={{ cursor: "pointer" }}>
              <KeyboardArrowDownIcon sx={{ color: "white" }} />
            </Box>
          </Box>
          <Box className="photos">
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png{" "}
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>

            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>

            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>

            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>
            <Box className="photoitem">
              <Box className="photodetail">
                <img src={AvtCho} alt="childphoto" />
                <Typography
                  sx={{
                    color: "lightgray",
                    fontSize: "14px",
                    fontWeight: "300",
                  }}
                >
                  photo_cho.png
                </Typography>
              </Box>
              <DownloadIcon sx={{ color: "white" }} />
            </Box>
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Detail;
