import {
  makeStyles,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Grid,
} from "@material-ui/core";
import { React, useState } from "react";

import server from '../../../../server.json';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: 150,
    width: 200,
  },
  action: {
    justifyContent: "center",
    color: "#45423C",
    marginTop: 25,
    fontFamily: 'KoPubWorld Bold',
    marginLeft: 20,
    fontSize: '14px'
  },
  recipe: {
    borderRadius: "50%",
    overflow: "hidden"
  }
}));


export default function SlideItem(props) {
  const classes = useStyles();
  // const { dt, idx } = props;

  return (

    <Typography className={classes.action} align="center" gutterBottom variant="h6" component="h2">
      <img width='120' height='120' src={props.rimg} className={classes.recipe}/>
      <div>{props.rName}</div>
    </Typography>
    
  );
};
