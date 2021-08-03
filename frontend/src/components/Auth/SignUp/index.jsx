import React, { useState } from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import server from '../../../server.json';


let postDatas = async (url, userName, userID, userPW) => {
    try {
        const data = await axios({
            method: 'post',
            url: url,
            data: {
                userName: userName,
                userID: userID,
                userPW: userPW
            },
            headers: {
                accept: 'application/json',
            },
        });
        console.log(`url: ${url}`);
        console.log(`data.data: ${data.data}`);
        return data.data;
    }
    catch (err) {
        console.log(url);
        console.log(`ERROR: ${err}`);
    }
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Ref:reci
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [userName, setUserName] = useState('');
    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="닉네임"
                                autoFocus
                                onChange={async (event) => {
                                    await setUserName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                component={RouterLink}
                                to="/#"
                                variant="outlined"
                                fullWidth
                            >
                            중복확인
                            </Button>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="아이디(E-mail)"
                                name="email"
                                autoComplete="email"
                                onChange={async (event) => {
                                    await setUserID(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                component={RouterLink}
                                to="/#"
                                variant="outlined"
                                fullWidth
                                fullHeight
                            >
                            인증
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="비밀번호"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={async (event) => {
                                    await setPassword(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="passwordcheck"
                                label="비밀번호확인"
                                type="passwordcheck"
                                id="passwordcheck"
                                autoComplete="current-password-check"
                                onChange={async (event) => {
                                    await setPasswordCheck(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="이메일로 소식을 받겠습니다."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        //type="submit"
                        component={RouterLink} to="/"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={async () => {
                            if(password === passwordCheck){
                                const userDatas = await postDatas(`${server.ip}/user/register`, userName, userID, password);
                            }
                            else{
                                alert('비밀번호와 비밀번호 확인이 다릅니다.');
                            }
                        }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
