import React from "react";
import { Box } from "@mui/material";
import BaseView from "./Child/BaseView";
import CV from "./Child/Testview";
function ViewCv() {
  return (
    <>
      <Box>
        {/* <BaseView /> */}
        <CV/>
      </Box>
    </>
  );
}

export default ViewCv;
