import Chip from "@mui/material/Chip";

const UlList = (prop) => {

  return (
    <>
      {prop.comps.map((comp) => (
        <Chip
          key={comp.skill_id}
          label={comp.name +" (experience: " +comp.experienceYear+")"}
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
