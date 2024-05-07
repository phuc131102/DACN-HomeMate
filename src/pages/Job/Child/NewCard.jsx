import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import "./Newcard.css";
import jobEmpty from "../../../assets/job_empty.png";
import { useNavigate, Link } from "react-router-dom";
function NewCard(prop) {
  const [isActive, setIsActive] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (!isAnimating) {
      setIsActive(true);
      setIsAnimating(true);
      setTimeout(() => {
        setIsActive(false);
        setIsAnimating(false);
      }, 10000);
    }
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (!isAnimating) {
        setIsActive(true);
        setIsAnimating(true);
        setTimeout(() => {
          setIsActive(false);
          setIsAnimating(false);
        }, 10000);
      }
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [isAnimating]);
  return (
    <Box>
      <Grid container>
        <Box id="gallery" className={isActive ? "active" : ""}>
          {prop.currentJobs
            .filter((card) => card.status === "Available")
            .map((card, index) => (
              <figure key={index}>
                <Box component={Link} to={`/job/${card._id.$oid}`}>
                  <img
                    src={card.image === "" ? jobEmpty : card.image}
                    alt={card.name}
                    title={card.name}
                    loading="lazy"
                  />
                  <figcaption>
                    <Typography>{card.name}</Typography>
                    <Typography>{card.datetime}</Typography>
                  </figcaption>
                </Box>
              </figure>
            ))}
        </Box>
      </Grid>
    </Box>
  );
}

export default NewCard;
