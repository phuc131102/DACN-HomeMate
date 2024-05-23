import React from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
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
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
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

function FindWorker() {
  const navigate = useNavigate();
  const theme2 = useTheme();
  const isMd = useMediaQuery(theme2.breakpoints.up("md"));
  const transition = { duration: 5, type: "spring" };

  const handleWorker = () => {
    navigate("/worker");
  };
  return (
    <Box
      sx={{
        width: isMd ? "80%" : "100%",
        margin: "auto",
        marginTop: "30px",
        display: "flex",
        background: "white",
        padding: "20px",
        borderRadius: "5px",
      }}
      className="service"
    >
      <Grid container>
        <Grid item xs={12} md={5}>
          <motion.div
            whileInView={{ y: "0" }}
            initial={{ y: "7rem", opacity: 0 }}
            animate={{ y: 10, opacity: 1 }}
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
                Need Domestic Woker
              </Typography>
              <Typography
                sx={{ color: "orange", fontSize: "1.5rem", fontWeight: "bold" }}
              >
                Place to find your suitable worker, keep your house clean
              </Typography>
              <Typography
                sx={{ color: "gray", marginTop: "20px" }}
                variant="body1"
              >
                Looking for worker? Click button below to view all workers
              </Typography>
              <Box sx={{ marginTop: "20px" }}>
                <ThemeProvider theme={theme}>
                  <Button
                    onClick={handleWorker}
                    variant="contained"
                    size="medium"
                    color="ochre"
                  >
                    Find Worker
                  </Button>
                </ThemeProvider>
              </Box>
            </Box>
          </motion.div>
        </Grid>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            className="Rightside"
            sx={{
              width: "500px",
              margin: "auto",
              marginTop: isMd ? "" : "20px",
            }}
          >
            <Box className="cards">
              <motion.div
                whileInView={{ x: "0" }}
                initial={{ x: "10rem", opacity: 0 }}
                transition={{ transition }}
                animate={{ x: 10, opacity: 1 }}
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
                    Create Your Own Job
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                whileInView={{ x: "0" }}
                initial={{ x: "-10rem", opacity: 0 }}
                transition={{ transition }}
                animate={{ x: -10, opacity: 1 }}
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
                    marginLeft: isMd ? "80px" : "20px",
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
                    Choose Suitable Worker
                  </Typography>
                </Box>
              </motion.div>
              <motion.div
                whileInView={{ x: "0" }}
                initial={{ x: "10rem", opacity: 0 }}
                transition={{ transition }}
                animate={{ x: 10, opacity: 1 }}
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
                    marginLeft: isMd ? "160px" : "40px",
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
                    Contact Them
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

export default FindWorker;
