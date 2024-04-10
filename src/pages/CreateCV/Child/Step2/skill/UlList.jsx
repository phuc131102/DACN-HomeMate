import Chip from "@mui/material/Chip";

const UlList = (prop) => {
  // let arr = prop.skillData.filter((compp)=>compp._id === (prop.comps[0].skillId))
  // console.log(arr)
  // console.log(prop.comps[0].skillId)
  // console.log(prop.skillData[1]._id)
  return (
    <>
      {prop.comps.map((comp) => (
        <Chip
          key={comp.skill_id}
          label={comp.name +" (experience: " +comp.experienceYear+")"}
          // label={prop.skillData.filter((compp)=>compp._id===comp.skillId)[0].name +" (experience: " +comp.experienceYear+")"}
          sx={{
            m: 0.5,
            height:"40px"
          }}
          variant="outlined"
          onDelete={() => {
            prop.handleDelete(comp.skill_id);
          }}
        />
      ))}
    </>
  );
};
export default UlList;
