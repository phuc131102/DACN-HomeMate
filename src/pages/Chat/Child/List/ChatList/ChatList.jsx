import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import avtCho from "./avtCho.jpg";
import "./Chatlist.css";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import useUsers from "../../../../../utils/userUtils/userUtils";
import { useChatStore } from "../../../../../lib/chatStore";

function ChatList() {
  const [chats, setChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [userData, setUserData] = useState(null);
  const { users} = useUsers();
  const { ChangeChat } = useChatStore();

  useEffect(() => {
    if (userData && userData.id) {
      const docRef = doc(db, "contacts", userData.id);
      const unSub = onSnapshot(
        docRef,
        (res) => {
          if (res.exists()) {
            const item = res.data();
            const idList = item.chat.map((item) => item.receiverId);
            const filteredData = users.filter((item) =>
              idList.includes(item._id.$oid)
            );
            const mergedArray = filteredData.map((item1) => {
              const item2 = item.chat.find(
                (item) => item.receiverId === item1._id.$oid
              );
              return { ...item1, ...item2 };
            });
            setChats(mergedArray.sort((a, b) => b.updateAt - a.updateAt));
            setFilteredChats(mergedArray.sort((a, b) => b.updateAt - a.updateAt));
          } else {
            console.log("No such document!");
          }
        },
        (error) => {
          console.error("Error fetching document: ", error);
        }
      );
      return () => unSub();
    }
  }, [userData, users]);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  const handleSelect = async (chat) => {
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

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = chats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchValue) ||
        chat.lastMessage.toLowerCase().includes(searchValue)
    );
    setFilteredChats(filtered);
  };

  return (
    <Box className="list" sx={{backgroundColor: "#1E1E1E", borderRadius: "8px" }}>
      <Box
        className="search"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          borderBottom: "1px solid #444",
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          fullWidth
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#888" }} />
              </InputAdornment>
            ),
            style: { color: "white" },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#444',
              },
              '&:hover fieldset': {
                borderColor: '#888',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#5183fe',
              },
            },
          }}
        />
      </Box>
      <Box className="items" sx={{ height: "524px", overflowY: "auto" }}>
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <Box
              className="item"
              sx={{
                display: "flex",
                padding: "20px",
                alignItems: "center",
                gap: "20px",
                cursor: "pointer",
                borderRadius: "8px",
                backgroundColor: chat.isSeen ? "transparent" : "#5183fe",
                transition: "background-color 0.3s",
                '&:hover': {
                  backgroundColor: "#5183fe",
                },
              }}
              key={chat.chatId}
              onClick={() => handleSelect(chat)}
            >
              <Avatar src={chat.avatar || avtCho} alt="Avatar" />
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ color: "white", fontWeight: "bold" }}>
                  {chat.name}
                </Typography>
                <Typography
                  sx={{
                    color: "#ccc",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: "14px",
                  }}
                >
                  {chat.lastMessage}
                </Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Typography sx={{ color: "white", textAlign: "center", marginTop: "20px" }}>
            No chats available
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default ChatList;
