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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import avtCho from "./avtCho.jpg";
import "./Chatlist.css";

function ChatList() {
  return (
    <Box className="list">
      <Box
        className="search"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          padding: "20px",
        }}
      >
        <Box className="searchBar">
          <TextField
            size="small"
            id="outlined-basic"
            label="Search"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Box className="items" sx={{ height: "524px", overflowY: "auto" }}>
        <Box
          className="item"
          sx={{
            display: "flex",
            padding: "20px",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            borderBottom: "solid 1px #dddddd35",
          }}
        >
          <Box>
            <img src={avtCho} alt="avt" className="avtimg" />
          </Box>
          <Typography sx={{ color: "white" }}>Con Cho</Typography>
          <Typography sx={{ color: "white" }}>Hello</Typography>
        </Box>
        {/*  */}
        <Box
          className="item"
          sx={{
            display: "flex",
            padding: "20px",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            borderBottom: "solid 1px #dddddd35",
          }}
        >
          <Box>
            <img src={avtCho} alt="avt" className="avtimg" />
          </Box>
          <Typography sx={{ color: "white" }}>Con Cho</Typography>
          <Typography sx={{ color: "white" }}>Hello</Typography>
        </Box>
        {/*  */}
        <Box
          className="item"
          sx={{
            display: "flex",
            padding: "20px",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            borderBottom: "solid 1px #dddddd35",
          }}
        >
          <Box>
            <img src={avtCho} alt="avt" className="avtimg" />
          </Box>
          <Typography sx={{ color: "white" }}>Con Cho</Typography>
          <Typography sx={{ color: "white" }}>Hello</Typography>
        </Box>
        {/*  */}
        <Box
          className="item"
          sx={{
            display: "flex",
            padding: "20px",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            borderBottom: "solid 1px #dddddd35",
          }}
        >
          <Box>
            <img src={avtCho} alt="avt" className="avtimg" />
          </Box>
          <Typography sx={{ color: "white" }}>Con Cho</Typography>
          <Typography sx={{ color: "white" }}>Hello</Typography>
        </Box>
        {/*  */}
        <Box
          className="item"
          sx={{
            display: "flex",
            padding: "20px",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            borderBottom: "solid 1px #dddddd35",
          }}
        >
          <Box>
            <img src={avtCho} alt="avt" className="avtimg" />
          </Box>
          <Typography sx={{ color: "white" }}>Con Cho</Typography>
          <Typography sx={{ color: "white" }}>Hello</Typography>
        </Box>
        {/*  */}
        <Box
          className="item"
          sx={{
            display: "flex",
            padding: "20px",
            alignItems: "center",
            gap: "20px",
            cursor: "pointer",
            borderBottom: "solid 1px #dddddd35",
          }}
        >
          <Box>
            <img src={avtCho} alt="avt" className="avtimg" />
          </Box>
          <Typography sx={{ color: "white" }}>Con Cho</Typography>
          <Typography sx={{ color: "white" }}>Hello</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default ChatList;
