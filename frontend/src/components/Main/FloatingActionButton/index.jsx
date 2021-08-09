import React from 'react';

import { createTheme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Fab from '@material-ui/core/Fab';
import KitchenIcon from '@material-ui/icons/Kitchen';
import DateRangeIcon from '@material-ui/icons/DateRange';
import BookIcon from '@material-ui/icons/Book';
import PersonIcon from '@material-ui/icons/Person';


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
  const rightMargin = 10

  return (
    <div>
      <ThemeProvider theme={mytheme}>
        <Fab
        color="primary"
        aria-label="user"
        style={
          {
            position: 'fixed',
            bottom: positionMargin,
            right: rightMargin,
          }
        }>
          <PersonIcon />
        </Fab>
        <Fab
        color="primary"
        aria-label="calendar"
        style={
          {
            position: 'fixed',
            bottom: positionMargin + 70,
            right: rightMargin,
          }
        }>
          <DateRangeIcon />
        </Fab>
        <Fab
        color="primary"
        aria-label="recipe"
        style={
          {
            position: 'fixed',
            bottom: positionMargin + 140,
            right: rightMargin,
          }
        }>
          <BookIcon />
        </Fab>
        <Fab
        color="primary"
        aria-label="fridge"
        style={
          {
            position: 'fixed',
            bottom: positionMargin + 210,
            right: rightMargin,
          }
        }>
          <KitchenIcon />
        </Fab>
      </ThemeProvider>
    </div>
  )};