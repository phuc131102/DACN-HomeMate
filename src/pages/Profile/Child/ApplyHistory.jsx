import React from "react";
import { Box, Grid, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";

function ApplyHistory(prop) {
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
        {prop.applyInfo.map((item, index) => (
          <Card
            sx={{
              display: "flex",
              backgroundColor: "white",
              borderRadius: "20px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
            }}
            key={index}
          >
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={item.job.image}
              alt="Live from space album cover"
            />
            <Box
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography component="div" variant="h5">
                    {item.job.name}
                  </Typography>
                  <Typography sx={{color:item.status==="Waiting"? "orange": "green"}}>{item.status}</Typography>
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
          </Card>
        ))}
      </Box>
    </>
  );
}

export default ApplyHistory;
