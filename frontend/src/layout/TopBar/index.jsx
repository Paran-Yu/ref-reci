import React, { useState } from 'react';

// Core
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Server
import axios from 'axios';
import server from '../../server.json';

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';

// NavLink
import {NavLink} from "react-router-dom";

// Theme -------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    userSelect: 'none',
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
  },
  appbar: {
    elevation: 0,
  },
  toolbar: {
    display: 'flex',
    justifyContent:  'space-between',
  },
  logo: {
    cursor: 'pointer'
  }
}));
// -------------------------------------------

const getLogout = async (url) => {
  try {
    const data = await axios({
      method: 'get',
      url: url,
      withCredentials: true,
      headers: {
        accept: 'application/json',
      },
    });
    return data.data;
  }
  catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

export default function TopBar() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.root} >
        <AppBar elevation={0} position="static" color="info">
          <Toolbar className={classes.toolbar}>
            <NavLink to={"/"}>
              <img width={150} src={process.env.PUBLIC_URL + '/logo_kr.png'} className={classes.logo} />
            </NavLink>
            <Button 
            color="secondary"
            onClick={async () => {
              const data = await getLogout(`${server.ip}/user/logout`);
              window.location.replace("http://i5a203.p.ssafy.io/signin");
            }} className={classes.logout}>
              <Typography variant="caption">
                | 로그아웃 | 
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  )
}




