import {useState, React} from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import PropTypes from 'prop-types';

// Core
import Grid from '@material-ui/core/Grid';

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

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
    top: theme.spacing(2),
    right: theme.spacing(2),
  }
}));
// -------------------------------------------


export default function TopBar() {
  const classes = useStyles();

  return (
    <div>
      <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="flex-end"
      alignItems="baseline"
      >
        <Grid item xs={2}>
          <span>
            마이페이지
          </span>
        </Grid>
        <Grid item xs={2}>
          <span>
            로그아웃
          </span>
        </Grid>
      </Grid>
      <Grid
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      m={3}
      >
        <img width={150} src={process.env.PUBLIC_URL + '/logo_kr.png'} />
      </Grid>
    </div>
  )
}