import React from "react";
import { Box } from "@mui/material";
import "./Hero.css";
import CountUp from "react-countup";
import { motion } from "framer-motion";

function Hero(prop) {
  return (
    <Box sx={{ backgroundColor: "rgb(77, 75, 75)" }}>
      <Box sx={{ width: "80%", margin: "auto" }}>
        <Box className="hero-wrapper">
          <Box className="paddings innerWidth flexCenter hero-container">
            <Box className="flexColStart hero-left">
              <Box className="hero-titles">
                <Box className="orange-circles" />
                <motion.h1
                  initial={{ y: "2rem", opacity:0 }}
                  animate={{ y: "2rem", opacity: 1 }}
                  transition={{ duration: "2", type: "spring" }}
                  whileInView={{ y: 0, opacity: 1 }}
                >
                  Discover <br />
                  Most Suitable <br />
                  Domestic Worker
                </motion.h1>
              </Box>
              <Box className="flexColStart hero-des">
                <span>Find a domestic worker that suit you very easily</span>
                <span>
                  Empowering Homes, Empowering Lives: Find Your Perfect Domestic
                  Match Today!
                </span>
              </Box>

              <Box className="flexCenter stats">
                <Box className="flexColStart stat">
                  <span>
                    <CountUp start={0} end={prop.jobLength} duration={3} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText">Jobs</span>
                </Box>
                <Box className="flexColStart stat">
                  <span>
                    <CountUp start={0} end={prop.ownerLength} duration={3} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText">Homeowners</span>
                </Box>
                <Box className="flexColStart stat">
                  <span>
                    <CountUp start={0} end={prop.workerLength} duration={3} />
                    <span>+</span>
                  </span>
                  <span className="secondaryText">Workers</span>
                </Box>
              </Box>
            </Box>

            <Box className="flexCenter hero-right">
              <motion.div
                initial={{ x: "3rem", opacity: 0 }}
                animate={{ x: "3rem", opacity: 0 }}
                transition={{
                  duration: 2,
                  type: "spring",
                }}
                whileInView={{ x: 0, opacity: 1 }}
                className="image-container"
              >
                <img
                  loading="lazy"
                  src="https://gaxa.vn/wp-content/uploads/2022/06/modern-house.jpg"
                  alt="modern-house"
                />
              </motion.div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Hero;
