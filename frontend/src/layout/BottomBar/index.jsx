// React, Router
import React, { useEffect, useState } from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Core
import createTheme from '@material-ui/core/styles/createTheme';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// Theme -------------------------------------
const mytheme = createTheme({
  palette: {
      primary: {
          light: '#f2da9e',
          main: '#f9bc15',
          dark: '#f19920',
          contrastText: '#fff',
      },
      secondary: {
          light: '#f2ede7',
          main: '#a29d97',
          dark: '#45423c',
          contrastText: '#fff',
      },
      success: {
          light: '#f2ede7',
          main: '#fee500',
          dark: '#45423c',
          contrastText: '#191600',
      },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    justifyContent: 'center',
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
        <Link color="inherit" href="https://material-ui.com/">
            Ref:reci
        </Link>{' '}
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