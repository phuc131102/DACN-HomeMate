import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions, Grid } from "@mui/material";

const cardData = [
  {
    title: "Lizard 1",
    description: "Description for lizard 1...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 2",
    description: "Description for lizard 2...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 1",
    description: "Description for lizard 1...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 2",
    description: "Description for lizard 2...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 1",
    description: "Description for lizard 1...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 2",
    description: "Description for lizard 2...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 1",
    description: "Description for lizard 1...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 2",
    description: "Description for lizard 2...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 1",
    description: "Description for lizard 1...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 2",
    description: "Description for lizard 2...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 1",
    description: "Description for lizard 1...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
  {
    title: "Lizard 2",
    description: "Description for lizard 2...",
    image: "/static/images/cards/contemplative-reptile.jpg",
  },
];

function Home() {
  return (
    <Grid container spacing={2}>
      {cardData.map((card, index) => (
        <Grid mt={4} ml={6} mb={4} item key={index} xs={12} sm={6} md={2.5}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={card.image}
                alt={card.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Home;
