import React, { useEffect, useState } from 'react';
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
import SaveIcon from '@material-ui/icons/Save'
import axios from 'axios';
import server from '../../../server.json';

const postRegister = async (url, userName, userID, userPW) => {
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

const postSearchName = async (url, userName) => {
    try {
        const data = await axios({
            method: 'post',
            url: url,
            data: {
                userName: userName,
            },
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

const postSearchID = async (url, userID) => {
    try {
        const data = await axios({
            method: 'post',
            url: url,
            data: {
                userID: userID,
            },
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

const postEmailAuth = async (url, userID) => {
    try {
        const data = await axios({
            method: 'post',
            url: url,
            data: {
                userID: userID,
            },
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
    const [checkDuplicate, setCheckDuplicate] = useState(false);
    const [emailAuth, setEmailAuth] = useState(false);
    const [passwordSame, setPasswordSame] = useState(false);

    useEffect(()=>{
        if(password === passwordCheck){
            console.log('비밀번호가 일치함');
            setPasswordSame(true);
        }
        else{
            console.log('비밀번호가 일치하지 않음');
            setPasswordSame(false);
        }
    }, [passwordCheck])

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
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                    setCheckDuplicate(false);
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                //component={RouterLink}
                                to="/#"
                                variant="outlined"
                                fullWidth
                                onClick={async()=>{
                                    const userDatas = await postSearchName(`${server.ip}/user/searchName`, userName);
                                    if(userDatas === true){
                                        setCheckDuplicate(true);
                                        console.log('중복 닉네임 없음');
                                    }
                                    else{
                                        setCheckDuplicate(false);
                                        console.log('중복 닉네임 존재');
                                    }
                                }}
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
                                onChange={(event) => {
                                    setUserID(event.target.value);
                                    //변화시 인증 초기화
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                //component={RouterLink}
                                //to="/#"
                                variant="outlined"
                                fullWidth
                                fullHeight
                                onClick={async () => {
                                    const userDatas = await postSearchID(`${server.ip}/user/searchID`, userID);
                                    if (userDatas === true) {
                                        console.log('중복 이메일 없음');
                                        //이메일 인증 시작
                                        const userDatas = await postEmailAuth(`${server.ip}/user/emailAuth`, userID);
                                    }
                                    else {
                                        console.log('중복 닉네임 존재');
                                    }
                                }}
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
                                onChange={(event) => {
                                    setPassword(event.target.value);
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
                                type="password"
                                id="passwordcheck"
                                autoComplete="current-password-check"
                                onChange={(event) => {
                                    setPasswordCheck(event.target.value);
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
                        //component={RouterLink} to="/"
                        fullWidth
                        // style={{
                        //     fontSize: 6
                        // }}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => {
                            if(passwordSame && checkDuplicate){
                                //const userDatas = await postRegister(`${server.ip}/user/register`, userName, userID, password);
                                alert('로그인 성공');
                            }
                            else if (passwordSame){
                                alert('닉네임 중복을 확인해주세요.');
                            }
                            else if (checkDuplicate){
                                alert('비밀번호와 비밀번호 확인이 다릅니다.');
                                alert(`비밀번호: ${password}`);
                                alert(`비밀번호 확인: ${passwordCheck}`);
                            }
                            else{
                                alert('닉네임 중복을 확인하고 비밀번호 확인도 확인해주세요.');
                                alert(`비밀번호: ${password}`);
                                alert(`비밀번호 확인: ${passwordCheck}`);
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
