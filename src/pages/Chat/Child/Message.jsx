import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  InputBase,
  IconButton,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import SendIcon from "@mui/icons-material/Send";
import "./Message.css";
import InfoIcon from "@mui/icons-material/Info";
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
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useTheme, styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CallIcon from "@mui/icons-material/Call";

const HoverIconButton = styled(IconButton)(({ theme }) => ({
  color: "white",
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));
function Message(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const navigate = useNavigate();
  const endRef = useRef(null);
  const [chat, setChat] = useState();
  const { chatId, user, ChangeChat} = useChatStore();
  const [img, setImg] = useState({ file: null, url: "" });  
  const [text, setText] = useState("");
  const buttonRef = useRef(null);
  useEffect(() => {
    const unSub = onSnapshot(doc(db, "messages", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  const handleTextChange = (e) => {
    setText(e.target.value);
    console.log(text);
  };
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
  useEffect(() => {
    // Add event listener for keypress when component mounts
    window.addEventListener("keydown", handleKeyPress);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  // console.log(prop.userInfo.name);
  const handleCall = () => {
    // ChangeChat(chatId, user);
    // ChangeCall(prop.userInfo);
    window.open(`/call/${chatId}`);
  };
  const handleTurnBack = () => {
    ChangeChat(null, null);
  };
  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
      e.target.value = null; // Reset input value to allow the same file to be selected again
    }
  };
  useEffect(() => {
    if (img.file !== null) {
      handleSend();
    }
  }, [img]);
  const handleVIewProfile = () => {
    navigate(`/user/${user._id.$oid}`);
  };

  const handleAceptCall = (link) => {
    console.log("changeCall");
    // ChangeCall(prop.userInfo.name);
    window.open(`${link}`);
    // console.log("click")
  };
  const handleSend = async () => {
    console.log(text);
    console.log("send");
    if (text === "" && img.file === null) {
      // console.log("return");
      return;
    }
    let imgURL = null;
    try {
      if (img.file) {
        imgURL = await uploadImg(img.file);
      }
      let pushText = img.file !== null ? "Send an image" : text;
      await updateDoc(doc(db, "messages", chatId), {
        message: arrayUnion({
          senderId: prop.userData.id,
          text: pushText,
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
  console.log(chatId);
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
              {!isMd && (
                <Box onClick={handleTurnBack}>
                  <ArrowBackIosIcon />
                </Box>
              )}
              <img
                src={user.avatar}
                alt="avt"
                className="avtimgss"
                loading="lazy"
              />
              <Box
                className="UserText"
                sx={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <Typography
                  sx={{ color: "white", fontSize: "18", fontWeight: "bold" }}
                >
                  {user.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Box
                className="icons"
                sx={{ color: "white", display: "flex", gap: "20px" }}
              >
                <HoverIconButton onClick={handleCall}>
                <CallIcon />
                </HoverIconButton>
              </Box>
              <Box
                className="icons"
                sx={{ color: "white", display: "flex", gap: "20px" }}
              >
                <HoverIconButton onClick={handleVIewProfile}>
                  <InfoIcon />
                </HoverIconButton>
              </Box>
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
                gap: "15px",
              }}
            >
              {chat?.message?.map((mess) => (
                <Box
                  className={
                    mess.senderId === prop.userData.id
                      ? "message own"
                      : "message"
                  }
                  key={mess?.createAt}
                >
                  <Box className="texts">
                    {mess.img && <img src={mess.img} alt="" />}
                    {mess.callLink && (
                      <Box>
                        <Typography
                          className="maintext"
                          sx={{
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => handleAceptCall(mess.callLink)}
                        >
                          {" "}
                          <CallIcon sx={{ marginRight: "10px" }} />
                          incoming call
                        </Typography>
                      </Box>
                    )}
                    {(mess.text === "Send an image" && mess.img) ||
                    mess.callLink ? (
                      ""
                    ) : (
                      <Typography className="maintext" sx={{ color: "white" }}>
                        {mess.text}
                      </Typography>
                    )}
                    {/* <span>1 min ago</span> */}
                  </Box>
                </Box>
              ))}
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
            <Paper
              component="form"
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                borderRadius: 25,
                boxShadow: 'none',
                backgroundColor: '#f1f1f1',
              }}
            >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Type a message..."
            value={text}
            onChange={handleTextChange}
          />
          <IconButton
            color="primary"
            sx={{ p: '10px' }}
            aria-label="send"
            ref={buttonRef}
            onClick={handleSend}
          >
            <SendIcon />
          </IconButton>
        </Paper>
          </Box>
        </Box>
      }
    </>
  );
}

export default Message;
