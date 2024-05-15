import React from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Footer() {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection:isMd?"":"column",
          justifyContent: isMd? "space-between":"center",
          backgroundColor: "white",
          color: "black",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 700,
              color: "black",
              textDecoration: "none",
              fontFamily: "cursive",
            }}
          >
            Home Mate
          </Typography>
        </Box>
        <Box
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          <Typography variant="body1" style={{ textAlign: "center" }}>
            Copyright © 2024 HomeMate Website, Inc.
          </Typography>
        </Box>
        <Box style={{}}>
          <BottomNavigation
            showLabels
            style={{
              backgroundColor: "white",
            }}
          >
            <BottomNavigationAction
              href="https://www.facebook.com/TranPhamMinhDang"
              label="Fanpage"
              icon={<FacebookIcon />}
              style={{
                color: "black",
              }}
            />
            <BottomNavigationAction
              label="Email"
              icon={<EmailIcon />}
              style={{ color: "black" }}
            />
            <BottomNavigationAction
              label="Contact"
              icon={<PhoneForwardedIcon />}
              style={{ color: "black" }}
            />
          </BottomNavigation>
        </Box>
      </Box>
    </>
  );
}
