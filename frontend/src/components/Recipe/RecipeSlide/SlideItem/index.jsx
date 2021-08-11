import {
  makeStyles,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { React, useState, useEffect } from "react";


const useStyles = makeStyles((theme) => ({
  paper: {
    height: 150,
    width: 200,
    marginTop: 10,
  },
  action: {
    justifyContent: "center",
    color: "#45423C",
  },
  recipeList: {
    fontFamily: 'KoPubWorld Bold'
  }
}));


const SlideItem = (props) => {
  const classes = useStyles();
  const { dt, idx } = props;
  return (
    <Card elevation={3} item className={classes.paper}>
      <CardActions className={classes.action}>
        <CardMedia></CardMedia>
        <CardContent>
          <Typography align="center" gutterBottom variant="h6" component="h2" className={classes.recipeList}>
            {dt.name}
          </Typography>
        </CardContent>
      </CardActions>
    </Card>
  );
};
export default SlideItem;
