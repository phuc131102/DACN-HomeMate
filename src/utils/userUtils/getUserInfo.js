import React from "react";
import useUserInfo from "./useUserInfo";
import { Avatar, Box, Typography } from "@mui/material";

const UserInfo = ({ userId }) => {
  const { userInfo } = useUserInfo(userId);

  if (!userInfo) return <span>Loading...</span>;

  return (
    <Box display="flex" alignItems="center">
      <Avatar
        src={userInfo.avatar}
        alt={userInfo.name}
        sx={{ marginRight: 2 }}
      />

      <Typography>{userInfo.name}</Typography>
    </Box>
  );
};

export default UserInfo;
