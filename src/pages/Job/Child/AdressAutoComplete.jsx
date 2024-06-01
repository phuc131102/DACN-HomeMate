import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

// const filter = createFilterOptions();

function AdressAutoComplete(prop) {
  return (
    <Autocomplete
      sx={{
        [`& fieldset`]: {
          borderRadius: 8,
        },
        "& .MuiInputLabel-asterisk": {
          color: "red",
        },
        // width: 300
      }}
      value={prop.value}
      disabled={prop.disab}
      onChange={(event, newValue) => {
        console.log("van an");
        if (typeof newValue === "string") {
          prop.setValue({
            title: newValue,
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          prop.setValue({
            title: newValue.inputValue,
          });
        } else {
          prop.setValue(newValue);
        }
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={prop.option}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === "string") {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      freeSolo
      renderInput={(params) => (
        <TextField required {...params} label={prop.name} />
      )}
    />
  );
}

export default AdressAutoComplete;
