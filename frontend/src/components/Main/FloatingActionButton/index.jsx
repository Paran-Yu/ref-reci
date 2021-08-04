import React from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookIcon from '@material-ui/icons/Book';
import PersonIcon from '@material-ui/icons/Person';


const theme = createTheme({
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
  },
});

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function FloatingActionButton() {
  const classes = useStyles();
  const positionMargin = 10
  return (
    <div>
      <Fab
          color="primary"
          aria-label="user"
          // className={classes.fab}
          style={
            {
              position: 'fixed',
              bottom: positionMargin,
              right: positionMargin,
          }
          }
        >
        <PersonIcon />
      </Fab>
      <Fab
          color="primary"
          aria-label="calendar"
          // className={classes.fab}
          style={
            {
              position: 'fixed',
              bottom: positionMargin + 70,
              right: positionMargin,
          }
          }
        >
        <DateRangeIcon />
      </Fab>
      <Fab
          color="primary"
          aria-label="recipe"
          // className={classes.fab}
          style={
            {
              position: 'fixed',
              bottom: positionMargin + 140,
              right: positionMargin,
          }
          }
        >
        <BookIcon />
      </Fab>
      <Fab
          color="primary"
          aria-label="fridge"
          // className={classes.fab}
          style={
            {
              position: 'fixed',
              bottom: positionMargin + 210,
              right: positionMargin,
          }
          }
        >
        <KitchenIcon />
      </Fab>
    </div>
  );
    }