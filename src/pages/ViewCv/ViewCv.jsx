import React from "react";
import { Box } from "@mui/material";
import BaseView from "./Child/BaseView";
import CV from "./Child/Testview";
function ViewCv(prop) {
  // console.log(prop.cvinfo)
  return (
    <>
      <Box>
        {/* <BaseView /> */}
        <CV cvinfo={prop.cvinfo}/>
      </Box>
    </>
  );
}

export default ViewCv;
