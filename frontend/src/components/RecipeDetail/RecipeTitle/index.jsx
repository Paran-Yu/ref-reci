import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

import server from '../../../server.json'

const useStyles = makeStyles((theme) => ({
  img: {
    width: '100%',
  },
  chip: {
    margin: '3px',
  },
  intro: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'space-around'
  }
}));


export default function RecipeTitle(props) {
  const classes = useStyles()
  const handleClick = () => {
    console.log('hi')
  }

  return (
  <Box mt={3} mb={1}>
    <Typography color="primary" variant="h3">{props.datas[0].recipeName}</Typography>
    <Box my={2}>
      <Divider />
    </Box>
    <Paper>
      <Grid container alignItems="center" className={classes.intro}>
        <Grid item xs={12} md={6}>
            <img className={classes.img} src={`${server.ip}/img?id=${props.datas[0].recipeImage}`} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box p={1}>
              {props.datas[0].recipeIntroduce}
          </Box>
          <Box p={1}>
            <Chip
              icon={<FaceIcon />}
              label={`${props.datas[0].recipeAmount}인분`}
              className={classes.chip}
            />
            <Chip
              icon={<FaceIcon />}
              label={`${props.datas[0].recipeTime}`}
              className={classes.chip}
            />
            <Chip
              icon={<FaceIcon />}
              label="URL 복사"
              className={classes.chip}
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  </Box>
  )
}