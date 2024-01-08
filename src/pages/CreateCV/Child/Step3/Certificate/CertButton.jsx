import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';

const CertButton = (prop) => {
  return (
    <>
      <Button
        color="primary"
        size="medium"
        variant="outlined"
        startIcon={<AddIcon/>}
        className="AddCompButton"
        sx={{
          margin: "auto",
        }}
        onClick={() => {
          prop.onPress();
        }}
      >
        Add
      </Button>
    </>
  );
};
export default CertButton;
