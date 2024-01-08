import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ChooseSkill from "./skill/ChooseSkill";
import CompHeader from "../compHeader";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

function CvStep2(prop) {
  return (
    <>
      <Box sx={{ width: "80%", margin: "auto", marginTop: "50px" }}>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <ChooseSkill
              handleSExp={prop.handleSExp}
              sInputValue={prop.sInputValue}
              setSInputValue={prop.setSInputValue}
              skillData={prop.skillData}
              skillOption={prop.skillOption}
              skills={prop.skills}
              handleSkilltDelete={prop.handleSkilltDelete}
              SExp={prop.SExp}
              setSExp={prop.setSExp}
              state={"Skill"}
              handleState={prop.setName}
              value={prop.name}
              onPress={prop.handleSkillAdd}
              setSkillId={prop.setSkillId}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ width: "100%", margin: "auto" }}>
              <CompHeader headerIcon={<WorkHistoryIcon />}>
                Work Experience
              </CompHeader>
              <ReactQuill
                theme="snow"
                style={{ height: "200px" , marginTop: "8px" }}
                value={prop.experience}
                onChange={prop.setExperience}
                className="QuillCss"
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CvStep2;
