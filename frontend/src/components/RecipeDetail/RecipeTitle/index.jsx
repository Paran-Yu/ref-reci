import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider, Icon, IconButton } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import TimerIcon from '@material-ui/icons/Timer';
import GroupIcon from '@material-ui/icons/Group';
import StarHalfIcon from '@material-ui/icons/StarHalf';

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
  const [isFavorite, setIsFavorite] = useState('');

  return (
  <Box mt={3} mb={1}>
    <Box mt={5}>
      <Typography color="primary" variant="h4" style={{fontFamily:'Jeju', fontStyle:'normal', fontWeight:'bold'}}>{props.datas[0].recipeName}</Typography>
    </Box>
    <Box my={2}>
      <Divider />
    </Box>
    <Paper>
      <Grid container alignItems="center" className={classes.intro}>
        <Grid item xs={12} md={6}>
            <img className={classes.img} src={`${server.ip}/img?id=${props.datas[0].recipeImage}`} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box mx={4}>
            <Typography color="secondary">
              {props.datas[0].recipeIntroduce}
            </Typography>
          </Box>
          <Box>
            <IconButton
              color="primary"
            >
              {/* <StarIcon /> */}
              {/* <StarHalfIcon /> */}
              <StarBorderIcon />
            </IconButton>
          </Box>
          <Box p={1}>
            <Chip
              icon={<GroupIcon />}
              color="primary"
              label={`${props.datas[0].recipeAmount}인분`}
              className={classes.chip}
            />
            <Chip
              icon={<HourglassEmptyIcon />}
              color="primary"
              label={`${props.datas[0].recipeTime}`}
              className={classes.chip}
            />
            <Chip
              icon={<FileCopyIcon />}
              color="primary"
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