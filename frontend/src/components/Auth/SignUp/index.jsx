// React, Router
import React, { useEffect, useState } from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Core
import createTheme from '@material-ui/core/styles/createTheme';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

// Icons & Images
import Background from '../../../images/main.png';

// Server
import axios from 'axios';
import server from '../../../server.json';

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
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + Background + ")",
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
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-start'
        },
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignUpSide({history}) {
    const classes = useStyles();

    //form 데이터
    const [userName, setUserName] = useState('');
    const [userID, setUserID] = useState('');
    const [verification, setVerification] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    
    //아래 2개가 SIGN UP을 활성화 시키기 위한 조건
    const [emailAuth, setEmailAuth] = useState(false);
    const [passwordSame, setPasswordSame] = useState(false);
    
    //아이디와 인증버튼 활성화, 비활성화
    const [verButtonInactive, setVerButtonInactive] = useState(false);
    //인증번호 입력칸 활성화, 비활성화
    const [hiddenAuth, setHiddenAuth] = useState(true);
    //SIGN UP 버튼을 활성화, 비활성화
    const [signUpInactive, setSignUpInactive] = useState(true);

    //서버에서 받아온 인증번호
    const [emailAuthData, setEmailAuthData] = useState('');

    useEffect(()=>{
        if(password === passwordCheck && password !== ''){
            console.log('비밀번호가 일치함');
            setPasswordSame(true);
        }
        else{
            console.log('비밀번호가 일치하지 않음');
            setPasswordSame(false);
        }
    }, [password, passwordCheck])

    useEffect(() => {
        if (emailAuth && passwordSame) {
            console.log('두개 모두 true');
            setSignUpInactive(false);
        }
        else {
            setSignUpInactive(true);
        }
    }, [emailAuth, passwordSame])


    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} className={classes.image} />
            <Grid item 
                xs={12} 
                sm={6}
                component={Paper} 
                elevation={6} 
                square
                container
                alignItems="center"
            >
                <ThemeProvider theme={mytheme}>
                    <div className={classes.paper}>
                        <Typography color="primary" variant="h2">
                            <b>Ref:Reci</b>
                        </Typography>
                        <br></br>
                        <Typography component="h1" variant="h5">
                            회원가입
                        </Typography>
                        <form className={classes.form}>
                            <Container maxWidth="md">
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    id="firstName"
                                    label="닉네임"
                                    onChange={(event) => {
                                        setUserName(event.target.value);
                                        console.log(event.target.value.length);
                                        if (event.target.value.length > 20){
                                            alert('20자 이하로 해주세요');
                                            event.target.value = event.target.value.slice(0, -1);
                                        }
                                    }}
                                />
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            disabled={verButtonInactive}
                                            variant="outlined"
                                            required
                                            margin="normal"
                                            required
                                            fullWidth
                                            autoFocus
                                            id="email"
                                            label="아이디(E-mail)"
                                            name="email"
                                            autoComplete="email"
                                            onChange={(event) => {
                                                setUserID(event.target.value);
                                                setEmailAuth(false);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            disabled={verButtonInactive}
                                            variant="outlined"
                                            fullWidth
                                            color="primary"
                                            required
                                            size="large"
                                            onClick={async () => {
                                                const userDatas = await postSearchID(`${server.ip}/user/searchID`, userID);
                                                if (userDatas.value === 'Success') {
                                                    console.log('중복 이메일 없음');
                                                    //이메일 인증 시작
                                                    const emailDatas = await postEmailAuth(`${server.ip}/user/emailAuth`, userID);

                                                    if (emailDatas.value === 'Email Sent'){
                                                        alert('이메일이 전송되었습니다.');
                                                        setHiddenAuth(false);
                                                        setEmailAuthData(emailDatas.number);
                                                        console.log(emailDatas.number);
                                                        setVerButtonInactive(true);
                                                    }
                                                    else if(emailDatas.value === 'Email Error'){
                                                        alert('이메일이 전송되지 못했습니다. 다시 인증 버튼을 눌러주세요.');
                                                    }

                                                    
                                                }
                                                else if (userDatas.value === 'Duplicate Email'){
                                                    alert('이미 가입된 계정입니다.');
                                                }
                                                else if(userDatas.value === 'Wrong Email'){
                                                    alert('이메일 형식이 잘못되었습니다.');
                                                }
                                            }}
                                        >
                                        인증
                                        </Button>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={10}>
                                        <TextField
                                            disabled={hiddenAuth}
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="verification"
                                            label="인증번호"
                                            name="verification"
                                            autoComplete="verification"
                                            onChange={(event) => {
                                                setVerification(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            color="primary"
                                            disabled={hiddenAuth}
                                            fullWidth
                                            size="large"
                                            onClick={async () => {
                                                if(verification == emailAuthData){
                                                    console.log('인증번호 일치');
                                                    setEmailAuth(true);
                                                    setHiddenAuth(true);
                                                }
                                                else{
                                                    alert('잘못된 인증번호입니다.');
                                                }
                                            }}
                                        >
                                        확인
                                        </Button>
                                    </Grid>
                                </Grid>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    fullWidth
                                    name="password"
                                    label="비밀번호"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(event) => {
                                        setPassword(event.target.value);
                                        if (event.target.value.length > 20) {
                                            alert('비밀번호는 8자 이상 20자 이하로 입력해주세요');
                                            event.target.value = event.target.value.slice(0, -1);
                                        }
                                    }}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    autoFocus
                                    name="passwordcheck"
                                    label="비밀번호확인"
                                    type="password"
                                    id="passwordcheck"
                                    autoComplete="current-password-check"
                                    onChange={(event) => {
                                        setPasswordCheck(event.target.value);
                                    }}
                                />
                                <Button
                                disabled={signUpInactive}
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                className={classes.submit}
                                onClick={async () => {
                                    const userDatas = await postRegister(`${server.ip}/user/register`, userName, userID, password);
                                    
                                    if(userDatas.value === 'Success'){
                                        alert('회원가입 완료');
                                        history.push("/");
                                    }
                                    else if (userDatas.value === 'Short userName'){
                                        alert('닉네임은 2자 이상 20자 이하로 입력해주세요.');
                                    }
                                    else if (userDatas.value === 'Short password') {
                                        alert('비밀번호는 8자 이상 20자 이하로 입력해주세요.');
                                    }
                                }}
                            >
                                회원가입
                            </Button>
                                <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={RouterLink} to="/signin" color="secondary" variant="body2">
                                        이미 계정이 있으신가요? 로그인 하러 가기
                                    </Link>
                                </Grid>
                            </Grid>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </Container>
                        </form>
                    </div>
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}
