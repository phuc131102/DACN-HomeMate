import CVForm from "./Child/CvForm";
import "./CreateCv.scss";
import Box from "@mui/material/Box";
import CvState from "./Child/CvState";

const CreateCV = () => {
  return (
    <Box className="CreateCV">
      {/* <CVForm></CVForm> */}
      <CvState/>
    </Box>
  );
};

export default CreateCV;
