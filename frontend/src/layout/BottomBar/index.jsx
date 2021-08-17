// React, Router
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';

// Core
import createTheme from '@material-ui/core/styles/createTheme';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// Theme -------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '180px',
    position: 'relative',
    bottom: 0,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    userSelect: 'none',
  },
}));
// -------------------------------------------

function Copyright() {
  const classes = useStyles();

  return (
    <Typography 
    variant="body2" 
    color="textSecondary" 
    align="start"
    className={classes.root}
    >
        {'Copyright © '}
        <span color="primary">
            Ref:reci
        </span>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
  );
}

// function Navigation() {
//   const classes = useStyles();
//   return (
//       <BottomNavigation
//         showLabels
//         className={classes.root}
//       >
//         <Copyright />
//       </BottomNavigation>
//   )
// }

export default function BottomBar() {
  return (
    <Copyright />
  )
}