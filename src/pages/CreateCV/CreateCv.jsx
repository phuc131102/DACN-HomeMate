import CVForm from "./Child/CvForm";
import "./CreateCv.scss";
import Box from "@mui/material/Box";


const CreateCV = () => {
  return (
    <Box className="CreateCV">
      <CVForm></CVForm>
    </Box>
  );
};

export default CreateCV;
