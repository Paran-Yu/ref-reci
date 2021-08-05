// React, Router
import React, { useEffect, useState } from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';

// Core
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// Icons 
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
      height: '100vh',
  },
  image: {
      // backgroundImage: `${authimg}`,
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
  },
  paper: {
      margin: theme.spacing(8, 4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
}));

export default function ChangePassword() {
      const classes = useStyles();
      const [checked, setChecked] = useState(true);

      const [userID, setUserID] = useState('');
      const [password, setPassword] = useState('');
  
      return (
          <Grid container component="main" className={classes.root}>
              <CssBaseline />
              <Grid item xs={false} sm={6} className={classes.image} />
              <Grid item xs={12} sm={6} component={Paper} elevation={6} square>
                  <div className={classes.paper}>
                      <Typography component="h1" variant="h5">
                          로그인
                      </Typography>
                      <form className={classes.form}>
                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              id="email"
                              label="아이디(E-mail)"
                              name="email"
                              type="email"
                              autoComplete="email"
                              autoFocus
                              onChange={(event) => {
                                  setUserID(event.target.value);
                              }}
                          />
                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              name="password"
                              label="비밀번호"
                              type="password"
                              id="password"
                              autoComplete="current-password"
                              onChange={(event) => {
                                  setPassword(event.target.value);
                              }}
                          />
                          <FormControlLabel
                              control={
                              <Checkbox 
                                  checked={checked}
                                  onChange={(e) => setChecked(e.target.checked)}
                                  value="remember"
                                  color="primary" 
                              />
                              }
                              label="아이디 / 비밀번호 저장"
                          />
                          <Button
                              //type="submit"
                              fullWidth
                              sizeLarge
                              variant="contained"
                              color="primary"
                              className={classes.submit}
                              onClick={async()=>{
                                  const userDatas = await postLogin(`${server.ip}/user/login`,userID,password);
  
                                  console.log(userDatas);
                              }}
                          >
                              Sign In
                          </Button>
                          <Grid container>
                              <Grid item xs={12} sm={6}>
                                  <Link href="#" variant="body2">
                                      Forgot password?
                                  </Link>
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                  <Link component={RouterLink} to="/signup" variant="body2">
                                      {"Don't have an account? Sign Up"}
                                  </Link>
                              </Grid>
                          </Grid>
                          <hr></hr>
                          <Button
                              xs={12}
                              mt={2}
                              component={RouterLink}
                              to="/#"
                              color="yellow"
                              variant="contained"
                              fullWidth
                          >
                              Kakao
                          </Button>
                          <Button
                              xs={12}
                              m={2}
                              component={RouterLink}
                              to="/#"
  
                              variant="contained"
                              fullWidth
                          >
                              Google
                          </Button>
                          <Button
                              xs={12}
                              m={2}
                              component={RouterLink}
                              to="/#"
                              color="white"
                              variant="contained"
                              fullWidth
                          >
                              GitHub
                          </Button>
                          <Box mt={5}>
                              <Copyright />
                          </Box>
                      </form>
                  </div>
              </Grid>
          </Grid>
    );
}