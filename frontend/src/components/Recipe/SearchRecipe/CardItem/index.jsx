import { React, useState, useEffect } from "react";
import {
  CardContent,
  CardMedia,
  CardActionArea,
  makeStyles,
  Typography,
  Card,
} from "@material-ui/core";
import { Router, Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

const CardItem = (props) => {
  const { dt, idx } = props;
  const classes = useStyles();

  return (
    <Card>
      <CardActionArea>
        <CardMedia title="살려줘" />
        <CardContent>
          <Typography variant="h5" component="h2">
            {dt.CatName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default CardItem;
