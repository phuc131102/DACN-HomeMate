import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  alpha,
  getContrastRatio,
} from "@mui/material/styles";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import { motion } from "framer-motion";

const orangeBase = "#ffb978";
const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);
const theme = createTheme({
  palette: {
    ochre: {
      main: orangeBase,
      light: alpha(orangeBase, 0.5),
      dark: alpha(orangeBase, 0.9),
      contrastText:
        getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});

function WokerGuide() {
  const transition = { duration: 5, type: "spring" };
  return (
    <Box
      sx={{ width: "80%", margin: "auto", marginTop: "30px", display: "flex",background:"white", padding:"20px", borderRadius:"5px"}}
      className="service"
    >
      <Grid container>
        <Grid item xs={5}>
          <motion.div
            whileInView={{ x: "0" }}
            initial={{ x: "7rem", opacity: 0 }}
            animate={{ x: -20, opacity: 1 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
          >
            <Box
              className="leftside"
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Typography sx={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {" "}
                Find Jobs
              </Typography>
              <Typography
                sx={{ color: "orange", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Become a worker and find your dream work
              </Typography>
              <Typography
                sx={{ color: "gray", marginTop: "20px" }}
                variant="body1"
              >
                If you want to find a job, just click a button below to
                view jobs
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <ThemeProvider theme={theme}>
                  <Button variant="contained" size="medium" color="ochre">
                    Find Job
                  </Button>
                </ThemeProvider>
              </Box>
            </Box>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}

        >
          <Box className="Rightside" sx={{ width: "500px", margin: "auto" }}>
            <Box className="cards">
              <motion.div
                whileInView={{ x: "0" }}
                initial={{ x: "30rem", opacity: 0 }}
                transition={{ transition }}
                animate={{ x: 30, opacity: 1 }}
                className="card"
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "300px",
                    padding: "10px",
                    border: " 1px solid orange",
                    borderRadius: "5px",
                  }}
                >
                  <LooksOneIcon fontSize="large" sx={{ color: "orange" }} />
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "orange",
                    }}
                  >
                    Build Your Own CV
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                whileInView={{ x: "0" }}
                initial={{ x: "-30rem", opacity: 0 }}
                transition={{ transition }}
                animate={{ x: -30, opacity: 1 }}
                className="card"
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "300px",
                    padding: "10px",
                    border: " 1px solid orange",
                    borderRadius: "5px",
                    marginLeft: "80px",
                    marginTop: "10px",
                  }}
                >
                  <LooksTwoIcon fontSize="large" sx={{ color: "orange" }} />
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "orange",
                    }}
                  >
                    Find Suitable Job
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                whileInView={{ x: "0" }}
                initial={{ x: "30rem", opacity: 0 }}
                transition={{ transition }}
                animate={{ x: 30, opacity: 1 }}
                className="card"
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "300px",
                    padding: "10px",
                    border: " 1px solid orange",
                    borderRadius: "5px",
                    marginLeft: "160px",
                    marginTop: "10px",
                  }}
                >
                  <Looks3Icon fontSize="large" sx={{ color: "orange" }} />
                  <Typography
                    sx={{
                      fontSize: "1rem",
                      fontWeight: "bold",
                      color: "orange",
                    }}
                  >
                    Apply For It
                  </Typography>
                </Box>
              </motion.div>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default WokerGuide;