import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  duration,
} from "@mui/material";
import MessageContainer from "./Child/MessageContainer";
// import videoBg from "../../assets/nightwall.webm";
import useUserInfo from "../../utils/userUtils/useUserInfo";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import useWorkers from "../../utils/userUtils/workerUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Chat() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [userData, setUserData] = useState(null);
  const { userInfo } = useUserInfo(userData?.id);
  // console.log(userInfo);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
      // console.log(parsedUserData);
    }
  }, []);
  return (
    // <Box
    //   sx={{
    //     width: "100vw",
    //     height: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    // >
    //   <video
    //     src={videoBg}
    //     autoPlay
    //     loop
    //     muted
    //     style={{
    //       position: "absolute",
    //       width: "100vw",
    //       height: "100vh",
    //       objectFit: "cover",
    //     }}
    //   ></video>
    <Box
      sx={{
        height: "100%",
        width: isMd ? "70%" : "100%",
        margin: "auto",
        marginTop: "5%",
      }}
    >
      {userInfo && <MessageContainer userInfo={userInfo} userData={userData} />}
    </Box>
    // </Box>
  );
}

export default Chat;
