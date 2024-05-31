import React, { useEffect, useRef, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useParams } from "react-router-dom";
import { useChatStore } from "../../../lib/chatStore";
import { useLocation } from "react-router-dom";
function randomID(len) {
  let result = "";
  if (result) return result;
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(url = window.location.href) {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function Call() {
  const location = useLocation();
  const { chatId, user, isLoading, ChangeChat, mainUser } = useChatStore((state) => ({
    chatId: state.chatId,
    user: state.user,
    isLoading: state.isLoading,
    ChangeChat: state.ChangeChat,
    mainUser:state.mainUser
  }));
  // console.log(mainUser)
  const params = useParams();
  const id = params.id.split("/").pop();
  // const [userData, setUserData] = useState(null);
  const [text, setText] = useState("");
  // const { chatId, user, ChangeChat } = useChatStore();
  // useEffect(() => {
  //   const storedUserData = localStorage.getItem("userData");
  //   if (storedUserData) {
  //     const parsedUserData = JSON.parse(storedUserData);
  //     setUserData(parsedUserData);
  //     // console.log(parsedUserData);
  //   }
  // }, []);
  const handleSend = async (text) => {
    // useEffect((text) => {
    
      if (text === "") {
        return;
      }
      console.log(text);
      try {
        // console.log(chatId)
        // console.log(id)
        // console.log(user)
        // console.log(mainUser)
        await updateDoc(doc(db, "messages", chatId), {
          message: arrayUnion({
            senderId: mainUser._id.$oid,
            text: "calling",
            createAt: new Date(),
            callLink: text,
          }),
        });
        const UserIds = [mainUser._id.$oid, user._id.$oid];
        UserIds.forEach(async (id) => {
          const userChatRef = doc(db, "contacts", id);
          const userChatSnapshot = await getDoc(userChatRef);

          if (userChatSnapshot.exists()) {
            const userChatsData = userChatSnapshot.data();

            const chatIndex = userChatsData.chat.findIndex(
              (c) => c.chatId === chatId
            );
            console.log(userChatsData.chat[chatIndex]);
            userChatsData.chat[chatIndex].lastMessage = "calling";
            userChatsData.chat[chatIndex].isSeen =
              id === mainUser._id.$oid ? true : false;
            userChatsData.chat[chatIndex].updateAt = Date.now();

            await updateDoc(userChatRef, {
              chat: userChatsData.chat,
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
      // setText("");
    
  };
  // },[userData]);

  ////////////////////////////////////
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element) => {
    const appID = 400317896;
    const serverSecret = "66d1b4f8446f366a73ddfeeba374e84a";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      randomID(5),
      mainUser.name
    );

    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.protocol +
            "//" +
            window.location.host +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
      },
    });
    let checkUrl = window.location.href;

    // console.log(checkUrl)
    if (!checkUrl.includes("?roomID="+ roomID)) {
      console.log(roomID)
      let text =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID;

      handleSend(text);
    }

    // setText(window.location.protocol +"//" +window.location.host +window.location.pathname +"?roomID=" +roomID)
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
