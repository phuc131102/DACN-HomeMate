import React from "react";
import {
    Box,
} from "@mui/material";

function EmptyAvt(prop) {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img
          alt="Kisspng computer"
          src={prop.avtEmpty}
          style={{
            width: "30%",
            height: "auto",
            // marginTop: "20%",
            marginBottom: "5%",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        />
      </Box>
    </>
  );
}

export default EmptyAvt;
