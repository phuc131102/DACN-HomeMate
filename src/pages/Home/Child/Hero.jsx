import React from "react";
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
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

function Hero() {
  return (
    <Box sx={{ backgroundColor: "rgb(77, 75, 75)" }}>
      <Box sx={{ width: "80%", margin: "auto" }}>
        <Box className="hero-wrapper">
          <Box className="paddings innerWidth flexCenter hero-container">
            <Box className="flexColStart hero-left">
              <Box className="hero-titles">
                <Box className="orange-circles"/>
                <motion.h1
                  initial={{ y: "2rem", opacity: "0" }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: "2", type: "spring" }}
                >
                  Discover <br />
                  Most Suitable <br />
                  Domestic Worker
                </motion.h1>
              </Box>
              <Box className="flexColStart hero-des">
                <span>
                  Find a domestic worker that suit you very easily
                </span>
                <span>
                  Empowering Homes, Empowering Lives: Find Your Perfect Domestic
                  Match Today!
                </span>
              </Box>

              <Box className="flexCenter stats">
                <Box className="flexColStart stat">
                  <span>
                    <CountUp start={8888} end={9000} duration={4} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText">Premium Product</span>
                </Box>
                <Box className="flexColStart stat">
                  <span>
                    <CountUp start={1950} end={2000} duration={4} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText">Happy Customers</span>
                </Box>
                <Box className="flexColStart stat">
                  <span>
                    <CountUp end={28} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText">Awards</span>
                </Box>
              </Box>
            </Box>

            <Box className="flexCenter hero-right">
              <motion.Box
                initial={{ x: "7rem", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 2,
                  type: "spring",
                }}
                className="image-container"
              >
                <img
                  src="https://gaxa.vn/wp-content/uploads/2022/06/modern-house.jpg"
                  alt="modern-house"
                />
              </motion.Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
