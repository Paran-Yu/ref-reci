import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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
    fontSize: '14px',
    textDecorationLine: 'none',
  },
  recipe: {
    borderRadius: "50%",
    overflow: "hidden"
  }
}));


export default function SlideItem(props) {
  const classes = useStyles();
  // const { dt, idx } = props;
  const detailUrl = "/rec/" + props.rID

  return (

    <Typography
     className={classes.action}
     align="center" 
     gutterBottom 
     variant="h6"
     component={RouterLink}
     to={detailUrl}
     >
      <img 
        width='120' 
        height='120' 
        src={props.rimg} 
        className={classes.recipe}
      />
      <div>{props.rName}</div>
    </Typography>
    
  );
};
