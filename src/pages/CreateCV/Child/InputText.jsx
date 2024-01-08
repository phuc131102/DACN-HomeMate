import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CompHeader from "./compHeader";

const InputText = (prop) => {
  return (
    <>
      <Box
        sx={{
          "& > :not(style)": {
            m: 1,
            width: prop.width,
            margin: prop.margin,
            marginTop: "8px",
            marginLeft:prop.marginLeft,
          },
        }}
        noValidate
        autoComplete="off"
      >
        <CompHeader headerIcon={prop.headerIcon}>{prop.state}</CompHeader>
        <TextField
          required
          multiline
          maxRows={4}
          type={prop.type}
          id="outlined-basic"
          value={prop.value}
          variant="outlined"
          onChange={prop.handleState}
        />
      </Box>
    </>
  );
};
export default InputText;
