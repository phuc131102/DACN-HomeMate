import React from "react";
import "./Profile.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Profile() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div className="index">
      <div className="div">
        <img
          className="rectangle"
          alt="Rectangle"
          src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/rectangle-5.svg"
        />
        <div className="overlap">
          <img
            className="img"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/6557899aae9ea9179a5e58f8/img/rectangle-54.svg"
          />
          <div className="input">
            <div className="overlap-group">
              <FormControl>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  defaultValue="password"
                  variant="outlined"
                  inputProps={{ style: { fontSize: 25 } }}
                  sx={{
                    width: 412,
                    height: 62,
                    [`& fieldset`]: { borderRadius: 8 },
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div className="text-wrapper-2">Password</div>
          </div>
        </div>
        <div className="overlap-2">
          <img
            className="rectangle-2"
            alt="Rectangle"
            src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/6557899aae9ea9179a5e58f8/img/rectangle-53.svg"
          />
          <div className="text-wrapper-3">PROFILE</div>
          <div className="input-2">
            <div className="div-wrapper">
              <TextField
                disabled
                id="role"
                variant="outlined"
                defaultValue="Manager"
                InputProps={{ style: { fontSize: 25 } }}
                sx={{
                  width: 412,
                  height: 62,
                  [`& fieldset`]: { borderRadius: 8 },
                }}
              />
            </div>
            <div className="text-wrapper-5">Role</div>
          </div>
        </div>
        <img
          className="path"
          alt="Path"
          src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/6557899aae9ea9179a5e58f8/img/path-41-1.svg"
        />
        <img
          className="path-2"
          alt="Path"
          src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/path-49.svg"
        />
        <img
          className="path-3"
          alt="Path"
          src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/6557899aae9ea9179a5e58f8/img/path-46-3.svg"
        />
        <img
          className="path-4"
          alt="Path"
          src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/path-50.svg"
        />
        <div className="overlap-3">
          <div className="overlap-4">
            <img
              className="ellipse"
              alt="Ellipse"
              src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/6557899aae9ea9179a5e58f8/img/ellipse-13-1.svg"
            />
            <div className="text-wrapper-6">user</div>
            <img
              className="rectangle-3"
              alt="Rectangle"
              src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/rectangle-55.svg"
            />
            <img
              className="kisspng-computer"
              alt="Kisspng computer"
              src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png"
            />
          </div>
          <img
            className="path-5"
            alt="Path"
            src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/655814d9b8c98c421b16e0c1/img/path-48.svg"
          />
        </div>
        <img
          className="ellipse-2"
          alt="Ellipse"
          src="https://cdn.animaapp.com/projects/655784b48c17a2032c616f6c/releases/6557899aae9ea9179a5e58f8/img/ellipse-15.svg"
        />
        <div className="button-primary">
          <div className="overlap-5">
            <Box sx={{ width: "100%", display: "flex" }}>
              <Button
                size="large"
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "green",
                  borderRadius: 8,
                }}
              >
                Save Changes
              </Button>
            </Box>
          </div>
        </div>
        <div className="input-3">
          <div className="overlap-6">
            <TextField
              id="username"
              variant="outlined"
              defaultValue="user"
              InputProps={{ style: { fontSize: 25 } }}
              sx={{
                width: 412,
                height: 62,
                [`& fieldset`]: { borderRadius: 8 },
              }}
            />
          </div>
          <div className="text-wrapper-9">Username</div>
        </div>
        <div className="input-4">
          <div className="overlap-7">
            <TextField
              id="email"
              variant="outlined"
              defaultValue="user@gmail.com"
              InputProps={{ style: { fontSize: 25 } }}
              sx={{
                width: 412,
                height: 62,
                [`& fieldset`]: { borderRadius: 8 },
              }}
            />
          </div>
          <div className="text-wrapper-5">Email</div>
        </div>
        <div className="input-5">
          <div className="overlap-7">
            <TextField
              id="phone-number"
              variant="outlined"
              InputProps={{ style: { fontSize: 25 } }}
              placeholder="Add your phone number here"
              sx={{
                width: 412,
                height: 62,
                [`& fieldset`]: { borderRadius: 8 },
              }}
            />
          </div>
          <div className="text-wrapper-5">Phone Number</div>
        </div>
        <p className="status-online">
          <span className="span">Status: </span>
          <span className="text-wrapper-12">Online</span>
        </p>
      </div>
    </div>
  );
}

export default Profile;