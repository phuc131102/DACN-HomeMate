import * as React from "react";
import Grid from "@mui/material/Grid";
import SmallUlList from "./smallUl";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const UlList = (prop) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <Grid container spacing={1} justifyContent="center" alignItems="center">
        {prop.comps.map((comp) => (
          <Grid key={comp.certificateId} item xs={isSm?3:6}>
              <SmallUlList comp={comp} handleDelete={prop.handleDelete} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default UlList;
