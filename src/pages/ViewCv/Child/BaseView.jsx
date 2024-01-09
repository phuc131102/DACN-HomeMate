import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import LeftCvComponent from "./LeftCvComponent";
import RightCvComponent from "./RightCvComponent";
import cvinfo from "./CVData";

function BaseView(prop) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUserData(parsedUserData);
    }
  }, []);

  return (
    <>
      <Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12} sx={{display:"flex",justifyContent:"center"}}>
            <Typography
              sx={{
                margin: "0",
                minWidth: "10%",
                fontWeight: "bold",
                fontSize: 50,
              }}
            >
              {cvinfo.title}
            </Typography>
          </Grid>
          <Grid container spacing={0} item xs={3}>
            <LeftCvComponent comp={cvinfo} />
          </Grid>
          <Grid container spacing={0} item xs={9}>
            <RightCvComponent comp={cvinfo} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default BaseView;
