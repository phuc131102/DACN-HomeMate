import React from "react";
import { Box, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import jobEmpty from "../../../assets/job_empty.png";

function ApplyHistory(prop) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {prop.applyInfo.length === 0 ? (
          <Typography sx={{ textAlign: "center" }}>No Data.</Typography>
        ) : (
          <>
            {prop.applyInfo.map((item, index) => (
              <Card
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                }}
                key={index}
              >
                <CardActionArea
                  component={Link}
                  to={`/job/${item.job._id.$oid}`}
                  sx={{ display: "flex" }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 151, height: "151px", objectFit: "cover" }}
                    image={item.job.image === "" ? jobEmpty : item.job.image}
                    alt="Live from space album cover"
                  />
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          flexDirection: isSm ? "" : "column",
                          justifyContent: isSm ? "space-between" : "flex-start",
                          alignItems: isSm ? "center" : "",
                        }}
                      >
                        <Typography component="div" variant="h5">
                          {item.job.name}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              color:
                                item.status === "Waiting" ||
                                item.status === "Working"
                                  ? "orange"
                                  : item.status === "Accepted" ||
                                    item.status === "Done"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {item.status}
                          </Typography>

                          {item.status === "Accepted" ||
                          item.status === "Done" ? (
                            <Typography
                              sx={{
                                color: "green",
                              }}
                            >
                              <CheckCircleOutlineIcon />
                            </Typography>
                          ) : item.status === "Rejected" ? (
                            <Typography
                              sx={{
                                color: "red",
                              }}
                            >
                              <NotInterestedIcon />
                            </Typography>
                          ) : null}
                        </Box>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        {item.job.datetime}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            ))}
          </>
        )}
      </Box>
    </>
  );
}

export default ApplyHistory;
