import React from "react";
import { Box, Grid } from "@mui/material";
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
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import LeftCvComponent from "./LeftCvComponent";

const CvComponent = (comp) => {
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
      <Box
        sx={{
          width: "90%",
          margin: "auto",
          alignItems: "center",
          //textAlign: "center",
        }}
      >
        <Card
          key={comp.comp.id}
          sx={{
            minWidth: 120,
            maxWidth: "100%",
            boxShadow: 10,
            borderRadius: 3,
          }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 20 }}>{comp.comp.title}</Typography>
            <Typography sx={{ fontSize: 20 }}>{comp.comp.intro}</Typography>
            <Typography sx={{ fontSize: 20 }}>
              {dayjs(comp.comp.createTime).format("MMMM D YYYY")}
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
          fullWidth={true}
          maxWidth={false}
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          sx={{ margin: "auto" }}
        >
          <DialogTitle id="scroll-dialog-title">
            <Grid container spacing={0} item xs={12}>
              <Grid
                item
                xs={3}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src={comp.user.image}
                  sx={{ width: 150, height: 150 }}
                ></Avatar>
              </Grid>
              <Grid item container xs={9}>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontSize: 50,
                    }}
                  >
                    {comp.user.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontSize: 20,
                    }}
                  >
                    <b>Email: </b>
                    {comp.user.email}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontSize: 20,
                    }}
                  >
                    <b>Phone number: </b>
                    {comp.user.phone}
                  </Typography>
                </Grid>
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
              <Grid container spacing={0} item xs={3}>
                <LeftCvComponent comp={comp.comp} />
              </Grid>
              <Grid container spacing={0} item xs={9}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontWeight: "bold",
                      fontSize: 50,
                    }}
                  >
                    {comp.comp.title}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontSize: 20,
                    }}
                  >
                    {comp.comp.certificateName}
                  </Typography>

                  <Grid item xs={12}>
                    {/* <Typography
                    variant="body1"
                    sx={{
                      margin: "0",
                      minWidth: "10%",
                      fontWeight: "bold",
                    }}
                  >
                    Organize:
                  </Typography> */}
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        margin: "0",
                        minWidth: "10%",
                      }}
                    >
                      {comp.comp.intro}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
                </Grid>
                <Grid item container xs={12}>
                  {comp.comp.expirationDate !== null ? (
                    <>
                      <Grid item xs={12}>
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

                      <Grid item xs={12}>
                        <Typography
                          variant="body1"
                          sx={{
                            margin: "0",
                            minWidth: "10%",
                          }}
                        >
                          {dayjs(comp.comp.expirationDate).format(
                            "MMMM D YYYY"
                          )}
                        </Typography>
                      </Grid>
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
                    <Typography
                      variant="body1"
                      sx={{
                        margin: "0",
                        minWidth: "10%",
                        wordWrap: "break-word",
                      }}
                    >
                      {comp.comp.link}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item container xs={12}>
                  <Grid item xs={12}>
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
                  <Grid item xs={12}>
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
            </Grid>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
/*CV cần gì
-Name
-intro
-SKill(SkillName, years)
-Experience
-Certificate
- pdf(optional)
- time create
*/
export default CvComponent;
