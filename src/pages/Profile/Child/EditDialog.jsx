import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import EditForm from "./EditForm";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditIDForm from "./EditIDForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditDialog(prop) {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    prop.handleCancle();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        sx={{
          color: "black",
          borderColor: "black",
          "&:hover": {
            backgroundColor: "rgba(110, 107, 107, 0.78)",
            borderColor: "rgba(110, 107, 107, 0.78)",
            boxShadow: "none",
          },
        }}
        onClick={handleClickOpen}
        disabled={prop.block ? true : false}
      >
        {prop.IDcard ? "Edit ID Info" : "Edit Profile"}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{
          "& .MuiDialog-paper": {
            width: isMd ? "30%" : "80%",
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle sx={{ textAlign: "center", fontSize: "25px" }}>
          <b>{prop.IDcard ? "Edit ID Information" : "Edit Profile"}</b>
        </DialogTitle>
        <DialogContent>
          {prop.IDcard ? (
            <EditIDForm
              error={prop.error}
              profile={prop.profile}
              handleChange={prop.handleChange}
              formData={prop.formData}
              setFormData={prop.setFormData}
              handleUpdate={prop.handleUpdate}
              handleClose={handleClose}
              finalTheme={prop.finalTheme}
              avatarBase64={prop.avatarBase64}
              setAvatarBase64={prop.setAvatarBase64}
              editing={prop.editing}
              handleEdit={prop.handleEdit}
            />
          ) : (
            <EditForm
              error={prop.error}
              profile={prop.profile}
              handleChange={prop.handleChange}
              formData={prop.formData}
              handleUpdate={prop.handleUpdate}
              handleClose={handleClose}
              handleTogglePasswordVisibility={
                prop.handleTogglePasswordVisibility
              }
              showPassword={prop.showPassword}
            />
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
