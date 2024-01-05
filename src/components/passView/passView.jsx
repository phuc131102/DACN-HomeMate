import React from "react";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const PasswordVisibilityToggle = ({ visible, onToggle }) => {
  return (
    <IconButton
      onClick={onToggle}
      edge="end"
      aria-label="toggle password visibility"
    >
      {visible ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
};

export default PasswordVisibilityToggle;
