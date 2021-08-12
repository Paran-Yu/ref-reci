// React, Router
import {useState, React, useEffect} from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink, Redirect } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Core
import createTheme from '@material-ui/core/styles/createTheme';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Icons & Images
// import { GoogleLoginButton } from "react-social-login-buttons";
// import { GithubLoginButton } from "react-social-login-buttons";

// Server 
import axios from 'axios';
import server from '../../../server.json';

//Social Login
const {Kakao} = window;

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
    typography: {
        fontFamily: "'KoPubWorld', Munhwajae, jeju",
        fontStyle: "normal",
        fontWeight: "Bold"
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: "url(" + process.env.PUBLIC_URL + '/images/main.png' + ")",
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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

const postLogin = async (url, userID, userPW) => {
    try{
        const data = await axios({
            method: 'post',
            url: url,
            data: {
                userID: userID,
                userPW: userPW
            },
            withCredentials: true,
            headers: {
                accept: 'application/json',
            },
        });
        return data.data;
    }
    catch(err){
        console.log(url);
        console.log(`ERROR: ${err}`);
    }
}

const checkLogin = async (url) => {
    try {
        const data = await axios({
            method: 'get',
            url: url,
            withCredentials: true,
            headers: {
                accept: 'application/json',
            },
        });
        console.log(data.data.value);
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
            <Link color="inherit" href="http://i5a203.p.ssafy.io/signin">
                Ref:reci
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignInSide({history}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(true)

    const [userID, setUserID] = useState('');
    const [password, setPassword] = useState('');

    useEffect(async () => {
        const data = await checkLogin(`${server.ip}/user/isLogin`);
        console.log(data);
    }, [])

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={6} className={classes.image} />
            <Grid item 
                xs={12} 
                sm={6} 
                component={Paper} 
                elevation={6} 
                container
                square
                justifyContent="flex-start"
                alignItems="center"
            >
                <ThemeProvider theme={mytheme}>
                <div className={classes.paper}>
                    <Typography color="primary" variant="h2" style={{fontFamily:'Munhwajae', fontStyle:'normal', fontWeight:'normal'}} >
                        <b>Ref:Reci</b>
                    </Typography>
                    <br></br>
                    <Typography component="h1" variant="h5" style={{fontWeight:'Bold'}}>
                        로그인
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            // margin="normal"
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
                                if (event.target.value.length > 20) {
                                    alert('비밀번호는 8자 이상 20자 이하로 입력해주세요');
                                    event.target.value = event.target.value.slice(0, -1);
                                }
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
                            fullWidth
                            size="large"
                            variant="contained"
                            color= "primary"
                            className={classes.submit}
                            onClick={async()=>{
                                if(4 <= password.length && password.length <= 20){
                                    const userDatas = await postSearchID(`${server.ip}/user/searchID`, userID);
                                    if (userDatas.value === 'Duplicate Email') {
                                        console.log('가입된 이메일입니다.');
                                        const userDatas = await postLogin(`${server.ip}/user/login`, userID, password);
                                        if (userDatas === true) {
                                            console.log('로그인 성공');
                                            history.push("/");
                                        }
                                        else {
                                            alert('비밀번호가 틀렸습니다.');
                                        }
                                    }
                                    else {
                                        alert('가입되지 않은 이메일입니다.');
                                    }
                                }
                                else{
                                    alert('비밀번호는 4자 이상, 20자 이하로 입력해주세요.')
                                    console.log(`현재 비밀번호 자릿수: ${password.length}`)
                                }
                            }}
                        >
                            로그인
                        </Button>
                        <Grid container>
                            <Grid item xs={6}>
                                <Link color="secondary" component={RouterLink} to="/changepassword" variant="body2">
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link color="secondary" component={RouterLink} to="/signup" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                        <hr></hr>

                        {/* <GithubLoginButton
                        href={"https://github.com/login/oauth/authorize?client_id=2d34711451a62f8f967d&redirect_uri="+server.ip+"/callback/github"}
                        >
                        </GithubLoginButton> */}
                        {/* <Button>
                            <img 
                            src={process.env.PUBLIC_URL + '/images/google.png'}
                            onClick={window.location.href="https://accounts.google.com/o/oauth2/v2/auth?client_id=14050797265-gchj4gpfqu6fmdet41v1g34mc53hdoic.apps.googleusercontent.com&redirect_uri="+server.ip+"/callback/google&response_type=code&scope=profile"}
                            />
                        </Button> */}
                        <Button>
                            <img 
                            src={process.env.PUBLIC_URL + '/images/google.png'}
                            onClick={()=>{
                                window.location.href="https://accounts.google.com/o/oauth2/v2/auth?client_id=14050797265-gchj4gpfqu6fmdet41v1g34mc53hdoic.apps.googleusercontent.com&redirect_uri="+server.ip+"/callback/google&response_type=code&scope=profile"
                            }}
                            />
                        </Button>
                        <Button>
                            <img 
                            src={process.env.PUBLIC_URL + '/images/kakao.png'}
                            onClick={() => {
                                Kakao.Auth.login({
                                    success: function (response) {
                                        Kakao.API.request({
                                            url: '/v2/user/me',
                                            success: async function (response) {
                                                console.log(response)
                                                const data = await axios({
                                                    method: 'post',
                                                    url: `${server.ip}/callback/kakao`,
                                                    data: {
                                                        id: response.id,
                                                        userName: response.properties.nickname
                                                    },
                                                    headers: {
                                                        accept: 'application/json',
                                                    },
                                                });
                                                console.log(data);
                                                if (data.data.value === 'Success') history.push("/");
                                                else if (data.data.value === 'Error') alert('로그인 과정에서 예상치 못한 문제가 발생했습니다.');
                                            },
                                            fail: function (error) {
                                                alert('로그인 중 에러 발생')
                                            },
                                        })
                                    },
                                    fail: function (error) {
                                        alert('로그인 중 에러 발생')
                                    },
                                })
                            }}
                            />
                        </Button>
                        <br></br>

                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
                </ThemeProvider>
            </Grid>
        </Grid>
    );
}