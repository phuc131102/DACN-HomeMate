import React, { useEffect, useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  onSnapshot,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";
import uploadImg from "../../../lib/upload";
function Message(prop) {
  const navigate = useNavigate();
  const endRef = useRef(null);
  const [chat, setChat] = useState();
  const { chatId, user } = useChatStore();
  const [img, setImg] = useState({ file: null, url: "" });
  // console.log(chat)
  const [text, setText] = useState("");
  // console.log(user);
  // console.log(chatId)
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "messages", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const handleVIewProfile=() => {
    navigate(`/user/${user._id.$oid}`);
  }
  const handleSend = async () => {
    if (text === "") {
      return;
    }
    let imgURL = null;
    try {
      if (img.file) {
        imgURL = await uploadImg(img.file);
      }
      await updateDoc(doc(db, "messages", chatId), {
        message: arrayUnion({
          senderId: prop.userData.id,
          text,
          createAt: new Date(),
          ...(imgURL && { img: imgURL }),
        }),
      });
      const UserIds = [prop.userData.id, user._id.$oid];
      UserIds.forEach(async (id) => {
        const userChatRef = doc(db, "contacts", id);
        const userChatSnapshot = await getDoc(userChatRef);

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();

          const chatIndex = userChatsData.chat.findIndex(
            (c) => c.chatId === chatId
          );
          console.log(userChatsData.chat[chatIndex]);
          userChatsData.chat[chatIndex].lastMessage = text;
          userChatsData.chat[chatIndex].isSeen =
            id === prop.userData.id ? true : false;
          userChatsData.chat[chatIndex].updateAt = Date.now();

          await updateDoc(userChatRef, {
            chat: userChatsData.chat,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
    setImg({
      file: null,
      url: "",
    });
    setText("");
  };
  return (
    <>
      {
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
              <img src={user.avatar} alt="avt" className="avtimgs" />
              <Box
                className="UserText"
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "18", fontWeight: "bold" }}
                >
                  {user.name}
                </Typography>
                {/* <Typography
                  sx={{ color: "#a5a5a5", fontSize: "14", fontWeight: "300" }}
                >
                  cai gi do
                </Typography> */}
              </Box>
            </Box>
            <Box
              className="icons"
              sx={{ color: "white", display: "flex", gap: "20px" }}
            >
              <InfoIcon onClick={handleVIewProfile}/>
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
              {chat?.message?.map((mess) => (
                  <Box className={mess.senderId===prop.userData.id?"message own" :"message"} key={mess?.createAt}>
                    <Box className="texts">
                      {mess.img && (
                        <img src={mess.img} alt=""/>
                      )}
                      <Typography className="maintext" sx={{ color: "white" }}>{mess.text}</Typography>
                      {/* <span>1 min ago</span> */}
                    </Box>
                  </Box>
              ))}
              {img.url && (
                <Box className="message own">
                  <img src={img.url} alt="avt" className="newImg"/>
                </Box>
              )}
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
              <label htmlFor="file">
                <ImageIcon sx={{ color: "white" }} />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={handleImg}
              />
            </Box>
            <TextField
              size="small"
              className="textMessage"
              id="standard"
              placeholder="Type a message..."
              value={text}
              sx={{
                flex: "1",
                outline: "none",
                color: "white",
                backgroundColor: "white",
                borderColor: "rgba(17,25,40,0.5)",
                width: "auto",
                borderRadius: "4px",
                fontSize: "16",
              }}
              onChange={(e) => setText(e.target.value)}
            />
            {/* <Box className="emoji" sx={{paddingRight:"10px", paddingLeft:"10px"}}>
          <EmojiEmotionsIcon sx={{ color: "white" }} />
        </Box> */}
            <Box sx={{ paddingLeft: "20px" }}>
              <Button variant="contained" onClick={handleSend}>
                {" "}
                send
              </Button>
            </Box>
          </Box>
        </Box>
      }
    </>
  );
}

export default Message;
