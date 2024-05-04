import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Grid,
  Box,
  Button,
  Modal,
  Typography,
  Stack,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Rating,
} from "@mui/material";
import avt_empty from "../../../assets/avt_empty.png";
import {
    rating_worker,
  } from "../../../services/jobAPI";

function CardRating(prop) {
  const labels = {
    0: "0",
    0.5: "0.5",
    1: "1.0",
    1.5: "1.5",
    2: "2.0",
    2.5: "2.5",
    3: "3.0",
    3.5: "3.5",
    4: "4.0",
    4.5: "4.5",
    5: "5.0",
  };

  const [value, setValue] = React.useState(0);
  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }
  const [hover, setHover] = React.useState(-1);
  const [ratingSuccess, setRatingSuccess] = React.useState(false);
  const handleRating = async (worker_id, rating) => {
    const updatedFormData = {
      workerId: worker_id,
      star: rating,
    };

    try {
      const response = await rating_worker(updatedFormData);
      if (response) {
        console.log("Rating successfully:", response);
        setRatingSuccess(true);
      }
    } catch (error) {
      if (error.response) {
      }
      console.error("Failed:", error);
    }
  };
  return (
    <>
      <Grid item xs={6} sm={3} md={3} key={prop.index}>
        <Card
          sx={{
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
          ></Grid>
          <CardActionArea component={Link} to={`/worker/${prop.card._id.$oid}`}>
            <CardMedia
              component="img"
              height="150"
              image={prop.card.avatar === "" ? avt_empty : prop.card.avatar}
              alt={prop.card.name}
            />
            <CardContent>
              <Typography
                sx={{
                  fontSize: 18,
                  textAlign: "center",
                  lineHeight: "1.2",
                  maxHeight: "1.2em",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  display: "block",
                }}
                color="text.primary"
                gutterBottom
              >
                <b>{prop.card.name}</b>
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{ justifyContent: "center" }}>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="simple-controlled"
                  value={value}
                  precision={0.5}
                  getLabelText={getLabelText}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                  onChangeActive={(event, newHover) => {
                    setHover(newHover);
                  }}
                  readOnly={ratingSuccess}
                />
                {value !== null && (
                  <Box sx={{ ml: 2 }}>
                    {labels[hover !== -1 ? hover : value]}
                  </Box>
                )}
              </div>
              {!ratingSuccess ? (
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    width: "100%",
                    borderRadius: "15px",
                    marginTop: "10px",
                  }}
                  onClick={() => {
                    handleRating(prop.card._id.$oid, value);
                  }}
                  disabled={value === 0}
                >
                  Send rating
                </Button>
              ) : (
                <Typography sx={{ textAlign: "center", color: "green" }}>
                  Rating sent !
                </Typography>
              )}
            </div>
          </CardActions>
        </Card>
      </Grid>
    </>
  );
}

export default CardRating;
