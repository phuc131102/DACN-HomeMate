import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";

export default function Footer() {
  return (
    <Box
      style={{
        marginTop: "auto",
        borderTop: "black solid 1px",
        backgroundColor: "#2E3B55",
        color: "white",
      }}
    >
      <h5 style={{ textAlign: "center" }}>
        <br />
        Copyright © 2024 HomeMate Website, Inc.
      </h5>
      <BottomNavigation showLabels style={{ backgroundColor: "#2E3B55" }}>
        <BottomNavigationAction
          href="https://www.facebook.com/TranPhamMinhDang"
          label="Fanpage"
          icon={<FacebookIcon />}
          style={{ color: "white" }}
        />
        <BottomNavigationAction
          label="Email"
          icon={<EmailIcon />}
          style={{ color: "white" }}
        />
        <BottomNavigationAction
          label="Contact"
          icon={<PhoneForwardedIcon />}
          style={{ color: "white" }}
        />
      </BottomNavigation>
    </Box>
  );
}
