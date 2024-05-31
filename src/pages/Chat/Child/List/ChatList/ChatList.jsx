import React, { useState, useEffect } from "react";
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
import useUserInfo from "../../../../../utils/userUtils/useUserInfo";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import useUsers from "../../../../../utils/userUtils/userUtils";
import { useChatStore } from "../../../../../lib/chatStore";
function ChatList() {
  const [chats, setChat] = useState([]);
  const [chatsuser, setChatUser] = useState([]);
  const [userData, setUserData] = useState(null);
  const { userInfo } = useUserInfo(userData?.id);
  const { users, loading } = useUsers();
  const { ChangeChat } = useChatStore();
  // console.log(users);
  // console.log(chats);
  useEffect(() => {
    if (userData && userData.id) {
      // console.log(userData.id)
      const docRef = doc(db, "contacts", userData.id);

      // Set up the snapshot listener
      const unSub = onSnapshot(
        docRef,
        (res) => {
          if (res.exists()) {
            const item = res.data();
            // console.log(item);
            const idList = item.chat.map((item) => item.receiverId);
            // console.log(idList);
            const filteredData = users.filter((item) =>
              idList.includes(item._id.$oid)
            );
            const mergedArray = filteredData.map((item1) => {
              const item2 = item.chat.find(
                (item) => item.receiverId === item1._id.$oid
              );
              return { ...item1, ...item2 }; // Merge properties of item1 and item2
            });
            setChat(mergedArray.sort((a, b) => b.updateAt - a.updateAt));
            setChatUser(res.data());
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error fetching document: ", error);
        }
      );

      return () => {
        unSub();
      };
    }
  }, [userData, users]);
  // console.log(chats);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      // console.log(parsedUserData);
    }
  }, []);
  // console.log(chats);
  const handleSelect = async (chat) => {
    // console.log(chat)

    const userChatRef = doc(db, "contacts", userData.id);
    const userChatSnapshot = await getDoc(userChatRef);

    if (userChatSnapshot.exists()) {
      const userChatsData = userChatSnapshot.data();

      const chatIndex = userChatsData.chat.findIndex(
        (c) => c.chatId === chat.chatId
      );
      userChatsData.chat[chatIndex].isSeen = true;

      await updateDoc(userChatRef, {
        chat: userChatsData.chat,
      });
    }

    ChangeChat(chat.chatId, chat);
  };
  return (
    <>
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
          {/* <Box className="searchBar">
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
          </Box> */}
        </Box>
        <Box className="items" sx={{ height: "524px", overflowY: "auto" }}>
          {chats.length > 0 ? (
            chats.map((chat) => (
              <Box
                className="item"
                sx={{
                  display: "flex",
                  padding: "20px",
                  alignItems: "center",
                  gap: "20px",
                  cursor: "pointer",
                  borderBottom: "solid 1px #dddddd35",
                  backgroundColor: chat.isSeen ? "transparent" : "#5183fe",
                }}
                key={chat.chatId}
                onClick={() => handleSelect(chat)}
              >
                <Box>
                  <img src={chat.avatar} alt="avt" className="avtimgs" />
                </Box>
                <Typography sx={{ color: "white" }}>{chat.name}</Typography>
                <Typography
                  sx={{
                    color: "white",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace:"nowrap"
                  }}
                >
                  {chat.lastMessage}
                </Typography>
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
      </Box>
    </>
  );
}

export default ChatList;
