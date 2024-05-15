import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CompHeader from "./compHeader";

const NotRInputText = (prop) => {
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: prop.width,
            margin: prop.margin,
            marginTop: "8px",
            marginLeft: prop.marginLeft,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <CompHeader headerIcon={prop.headerIcon}>{prop.state}</CompHeader>
        <TextField
          type={prop.type}
          value={prop.value}
          variant="outlined"
          onChange={prop.handleState}
        />
      </Box>
    </>
  );
};
export default NotRInputText;
