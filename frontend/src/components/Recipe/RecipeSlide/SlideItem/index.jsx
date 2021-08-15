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
    marginTop: 10,
  },
  action: {
    justifyContent: "center",
    color: "#45423C",
    marginTop: 20,
    fontFamily: 'KoPubWorld Bold'
  },
  recipe: {
    borderRadius: "50%",
    overflow: "hidden"
  }
}));
//      {/* <CardActions className={classes.action}> */}
        
//        {/* <CardContent> */}
// {/*<Card elevation={3} item className={classes.paper}>*/}
// </Card> <CardMedia></CardMedia>
const SlideItem = (props) => {
  const classes = useStyles();
  // const { dt, idx } = props;

  return (

    <Typography className={classes.action} align="center" gutterBottom variant="h6" component="h2">
      <img width='120' height='120' src={props.rimg} className={classes.recipe}/>
      <div>{props.rName}</div>
    </Typography>
    
  );
};
export default SlideItem;
