import React, { useEffect, useRef } from "react";
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
import "./Message.css";
import InfoIcon from "@mui/icons-material/Info";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ImageIcon from "@mui/icons-material/Image";
import { styled } from "@mui/material/styles";

function Message() {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({behavior:"smooth"})
  }, []);

  return (
    <Box
      className="chat"
      sx={{
        borderLeft: "1px solid #dddddd35",
        borderRight: "1px solid #dddddd35",
        height: "100%  ",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        className="top"
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #dddddd35",
        }}
      >
        <Box
          className="user"
          sx={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <img src={AvtCho} alt="avt" className="avtimgs" />
          <Box
            className="UserText"
            sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <Typography
              sx={{ color: "white", fontSize: "18", fontWeight: "bold" }}
            >
              Con Cho
            </Typography>
            <Typography
              sx={{ color: "#a5a5a5", fontSize: "14", fontWeight: "300" }}
            >
              cai gi do
            </Typography>
          </Box>
        </Box>
        <Box
          className="icons"
          sx={{ color: "white", display: "flex", gap: "20px" }}
        >
          <InfoIcon />
        </Box>
      </Box>
      {/*  */}
      <Box>
        <Box
          className="center"
          sx={{
            padding: "20px",
            flex: 1,
            overflowY: "scroll",
            display: "flex",
            flexDirection: "column",
            height: "525px",
            gap: "20px",
          }}
        >
          <Box className="message">
            <img src={AvtCho} alt="avt" className="avtimgs" />
            <Box className="texts">
              <Typography className="maintext">
                Chả là t đang vẽ truyện thiếu nhi cho Kim Đồng... Đến đoạn đặt
                tên credit họa sĩ minh họa thì t ko biết có nên lấy bút danh
                nước ngòai của bản thân không (Lemonate). Hay t có nên tạo ra
                hẳn 1 bút danh và 1 page khác dành cho vẽ minh họa truyện trẻ em
                và dùng bút danh đó đưa cho Kim
              </Typography>
              <span>1 min ago</span>
            </Box>
          </Box>
          {/*  */}
          <Box className="message own">
            <Box className="texts">
              <Typography className="maintext">
                Chả là t đang vẽ truyện thiếu nhi cho Kim Đồng... Đến đoạn đặt
                tên credit họa sĩ minh họa thì t ko biết có nên lấy bút danh
                nước ngòai của bản thân không (Lemonate). Hay t có nên tạo ra
                hẳn 1 bút danh và 1 page khác dành cho vẽ minh họa truyện trẻ em
                và dùng bút danh đó đưa cho Kim
              </Typography>
              <span>1 min ago</span>
            </Box>
          </Box>
          {/*  */}
          <Box className="message">
            <img src={AvtCho} alt="avt" className="avtimgs" />
            <Box className="texts">
              <Typography className="maintext">
                Chả là t đang vẽ truyện thiếu nhi cho Kim Đồng... Đến đoạn đặt
                tên credit họa sĩ minh họa thì t ko biết có nên lấy bút danh
                nước ngòai của bản thân không (Lemonate). Hay t có nên tạo ra
                hẳn 1 bút danh và 1 page khác dành cho vẽ minh họa truyện trẻ em
                và dùng bút danh đó đưa cho Kim
              </Typography>
              <span>1 min ago</span>
            </Box>
          </Box>
          {/*  */}
          <Box className="message own">
            <Box className="texts">
              <Typography className="maintext">
                Chả là t đang vẽ truyện thiếu nhi cho Kim Đồng... Đến đoạn đặt
                tên credit họa sĩ minh họa thì t ko biết có nên lấy bút danh
                nước ngòai của bản thân không (Lemonate). Hay t có nên tạo ra
                hẳn 1 bút danh và 1 page khác dành cho vẽ minh họa truyện trẻ em
                và dùng bút danh đó đưa cho Kim
              </Typography>
              <span>1 min ago</span>
            </Box>
          </Box>
          {/*  */}
          <Box className="message">
            <img src={AvtCho} alt="avt" className="avtimgs" />
            <Box className="texts">
              <img src={AvtCho} alt="avt" />
              <Typography className="maintext">
                Chả là t đang vẽ truyện thiếu nhi cho Kim Đồng... Đến đoạn đặt
                tên credit họa sĩ minh họa thì t ko biết có nên lấy bút danh
                nước ngòai của bản thân không (Lemonate). Hay t có nên tạo ra
                hẳn 1 bút danh và 1 page khác dành cho vẽ minh họa truyện trẻ em
                và dùng bút danh đó đưa cho Kim
              </Typography>
              <span>1 min ago</span>
            </Box>
          </Box>
          <Box ref={endRef}></Box>
        </Box>
      </Box>
      {/*  */}
      <Box
        className="bottom"
        sx={{
          display: "flex",
          padding: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: "1px solid #dddddd35",
        }}
      >
        <Box className="icons" sx={{ paddingRight: "20px" }}>
          <ImageIcon sx={{ color: "white" }} />
        </Box>
        <TextField
          size="small"
          className="textMessage"
          id="standard"
          placeholder="Type a message..."
          sx={{
            flex: "1",
            outline: "none",
            color: "white",
            backgroundColor: "rgba(17,25,40,0.5)",
            borderColor: "rgba(17,25,40,0.5)",
            width: "auto",
            borderRadius: "4px",
            fontSize: "16",
          }}
        />
        {/* <Box className="emoji" sx={{paddingRight:"10px", paddingLeft:"10px"}}>
          <EmojiEmotionsIcon sx={{ color: "white" }} />
        </Box> */}
        <Box sx={{ paddingLeft: "20px" }}>
          <Button variant="contained"> send</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Message;
