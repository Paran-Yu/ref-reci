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
  bar: {
    position: 'fixed',
    top: theme.spacing(5),
  }
}));
// -------------------------------------------

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="start">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
              Ref:reci
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
      </Typography>
  );
}

export default function BottomBar() {
  const classes = useStyles();

  return (
    <Copyright />
  )
}