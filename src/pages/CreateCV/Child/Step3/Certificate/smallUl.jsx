import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SmallUlList = (comp) => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.up("sm"));
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <>
      <Card
        key={comp.comp.id}
        sx={{ minWidth: 120, maxWidth: 200, boxShadow: 10, borderRadius: 3 }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20,wordWrap: "break-word", }}>
            {comp.comp.certificateName}
          </Typography>
          <Typography sx={{ fontSize: 20,wordWrap: "break-word", }}>
            {comp.comp.organizationName}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button onClick={handleClickOpen("paper")} size="small">
            More Detail
          </Button>
          <IconButton
            sx={{ marginLeft: "auto" }}
            aria-label="add to favorites"
            onClick={() => {
              comp.handleDelete(comp.comp.certificateId);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{ maxWidth: "700px", margin: "auto" }}
      >
        <DialogTitle id="scroll-dialog-title">
          <Grid container spacing={0} item xs={12}>
            <Grid item xs={isSm ? 3 : 12}>
              <Typography
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                Certificate:
              </Typography>
            </Grid>
            <Grid item xs={isSm ? 9 : 12}>
              <Typography
                variant="body1"
                sx={{
                  margin: "0",
                  minWidth: "10%",
                  wordWrap: "break-word",
                }}
              >
                {comp.comp.certificateName}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent dividers={scroll === "paper"}>
          <Grid
            container
            spacing={0}
            justifyContent="center"
            alignItems="center"
          >
            <Grid container spacing={0} item xs={12}>
              <Grid item xs={isSm ? 3 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                    fontWeight: "bold",
                  }}
                >
                  Organize:
                </Typography>
              </Grid>
              <Grid item xs={isSm ? 9 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                    wordWrap: "break-word",
                  }}
                >
                  {comp.comp.organizationName}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={isSm ? 3 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                    fontWeight: "bold",
                  }}
                >
                  From:
                </Typography>
              </Grid>
              <Grid item xs={isSm ? 9 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                  }}
                >
                  {dayjs(comp.comp.dateEarned).format("MMMM D YYYY")}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              {comp.comp.expirationDate !== null ? (
                <>
                  <Grid item xs={isSm ? 3 : 12}>
                    <Typography
                      variant="body1"
                      sx={{
                        margin: "0",
                        minWidth: "10%",
                        fontWeight: "bold",
                      }}
                    >
                      To:
                    </Typography>
                  </Grid>

                  <Grid item xs={isSm ? 9 : 12}>
                    <Typography
                      variant="body1"
                      sx={{
                        margin: "0",
                        minWidth: "10%",
                      }}
                    >
                      {dayjs(comp.comp.expirationDate).format("MMMM D YYYY")}
                    </Typography>
                  </Grid>
                </>
              ) : (
                ""
              )}
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={isSm ? 3 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                    fontWeight: "bold",
                  }}
                >
                  Link:
                </Typography>
              </Grid>
              <Grid item xs={isSm ? 9 : 12}>
                <Typography
                  variant="body1"
                  sx={{ margin: "0", minWidth: "10%", wordWrap: "break-word" }}
                >
                  {comp.comp.link}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={isSm ? 3 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                    fontWeight: "bold",
                  }}
                >
                  Detail:
                </Typography>
              </Grid>
              <Grid item xs={isSm ? 9 : 12}>
                <Typography
                  variant="body1"
                  sx={{
                    margin: "0",
                    minWidth: "10%",
                    wordWrap: "break-word",
                  }}
                >
                  {comp.comp.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SmallUlList;
