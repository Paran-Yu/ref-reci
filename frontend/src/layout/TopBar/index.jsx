import {useState, React} from 'react';

// Core
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <img width={150} src={process.env.PUBLIC_URL + '/logo_kr.png'} />
            <Button color="inherit">로그아웃</Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}




