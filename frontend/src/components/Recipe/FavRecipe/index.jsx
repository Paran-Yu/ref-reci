import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Core
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// Server
import server from '../../../server.json';

const useStyles = makeStyles({
  cardroot: {
    maxWidth: 345,
    height: 'h-100',
  },
  media: {
    height: 180,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const url = server.ip + "/img";

export default function FavRecipe(props) {
  const classes = useStyles();

  return (
// grid -> grid item -> card -> cardactionarea
  <Card className={classes.cardroot}>
    <CardActionArea>
      <CardMedia
        className={classes.media}
        image={props.url}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.rName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.rIntroduce}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  )
}