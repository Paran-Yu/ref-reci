import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'
import Badge from '@material-ui/core/Badge';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
}));


export default function FoodList(props) {
  const classes = useStyles();

  return (
    <Box>
      <Card className={classes.root}>
        <CardMedia
          component="img"
          alt="recipe-image"
          className={classes.cover}
          image="{props.imgurl}"
          title="Live from space album cover"
        />
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {/* {props.FoodName} */}
              양파
            </Typography>
            {/* <Divider orientation="horizontal" variant="fullWidth"/> */}
            <Typography variant="subtitle1" color="textSecondary">
              {/* {props.Food} */}
              수량
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Box>
  )
};
