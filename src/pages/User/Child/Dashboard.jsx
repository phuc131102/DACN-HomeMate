import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Box, TextField } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import InfoBox from "./InfoBox";
import RightSide from "./RightSide";
import UserFilter from "./UserFilter";
import { get_skill } from "../../../services/skillAPI";
import { create_skill, delete_Skill } from "../../../services/skillAPI";
function Dashboard(prop) {
  const [chooseSkill, setChooseSkill] = useState([]);
  console.log(chooseSkill);
  const [filterItems, setFilterItems] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  // console.log(text);
  useEffect(() => {
    const fetchSkill = async () => {
      setLoading(true);
      try {
        const response = await get_skill();
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skill information:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkill();
  }, []);

  // const handleDeleteSkill = async () => {
  //   let tempItems = chooseSkill.map((selectedSkill) => {
  //     let temp = skills.filter((skillItem) => {
  //       let tempArray = skillItem.name === selectedSkill;
  //       return tempArray;
  //     });
  //     console.log(temp);
  //     return temp;
  //   });
  // };
  // const handleAddSKill = async () => {
    
  // };
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to dashboard
          </Typography>
        </Grid>
        <Grid item container xs={12} className="DashboardDiagram">
          <Grid container item xs={12} md={4} className="LeftSide">
            <InfoBox users={prop.users} jobs={prop.jobs} />
          </Grid>
          <Grid container item xs={12} md={8} className="RightSide">
            <RightSide users={prop.users} jobs={prop.jobs} />
          </Grid>
        </Grid>
        {/* <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Skill Managment
          </Typography>
          <Grid container item xs={12}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", gap: "20px", marginBottom: "20px" }}
            >
              <Box sx={{ width: "300px" }}>
                <UserFilter
                  option={skills}
                  chooseOption={chooseSkill}
                  setChooseOption={setChooseSkill}
                  label="Delete Skill"
                />
              </Box>
              <Button
                variant="outlined"
                size="small"
                sx={{ width: "100px" }}
                onClick={handleDeleteSkill}
              >
                Delete
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ display: "flex", gap: "20px" }}>
              <Box sx={{ width: "300px" }}>
                <TextField
                  sx={{
                    width: "100%",
                    [`& fieldset`]: {
                      borderRadius: 8,
                    },
                  }}
                  value={text}
                  variant="outlined"
                  label="Add Skill"
                  onChange={(e) => setText(e.target.value)}
                />
              </Box>
              <Button variant="outlined" size="small" sx={{ width: "100px" }}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
}

export default Dashboard;
