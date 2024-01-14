import Chip from "@mui/material/Chip";

const UlList = (prop) => {
  return (
    <>
      {prop.comps.map((comp) => (
        <Chip
          key={comp.cvSkillsId}
          label={prop.skillData.filter((compp)=>compp._id===comp.skillId)[0].name +" (experience: " +comp.experienceYear+")"}
          sx={{
            m: 0.5,
            height:"40px"
          }}
          variant="outlined"
          onDelete={() => {
            prop.handleDelete(comp.cvSkillsId);
          }}
        />
      ))}
    </>
  );
};
export default UlList;
