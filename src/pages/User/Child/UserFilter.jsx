import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
function UserFilter(prop) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    prop.setChooseOption(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <Box>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel id="demo-multiple-checkbox-label">{prop.label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={prop.chooseOption}
          onChange={handleChange}
          input={<OutlinedInput label={prop.label} />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{
            [`& fieldset`]: {
              borderRadius: 8,
            },
          }}
        >
          {prop.option.map((name) => (
            <MenuItem key={name.name} value={name.name}>
              <Checkbox checked={prop.chooseOption.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default UserFilter;
