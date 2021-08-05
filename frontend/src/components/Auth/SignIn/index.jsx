// React, Router
import {useState, React} from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';

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
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/styles'

// Icons
import Background from '../../../images/main.png';

// Server 
import axios from 'axios';
import server from '../../../server.json';

// const kakao = createTheme({
//     palette: {
//         primary: {
//             light: '#f2ede7',
//             main: '#fee500',
//             dark: '#191600',
//             contrastText: '#191600',
//         },
//     },
// });

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
        // backgroundColor: 
        //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
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


export default function SignInSide({history}) {
    const classes = useStyles();
    const [checked, setChecked] = useState(true)

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
                    <ThemeProvider theme={mytheme}>
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
                            //type="submit"
                            fullWidth
                            sizeLarge
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
                            <Grid item xs={12} sm={6}>
                                <Link component={RouterLink} to="/changepassword" variant="body2">
                                    비밀번호 찾기
                                </Link>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Link component={RouterLink} to="/signup" variant="body2">
                                    회원가입
                                </Link>
                            </Grid>
                        </Grid>
                        <hr></hr>
                        <Button
                            xs={12}
                            mt={2}
                            to="/#"
                            color="success"
                            variant="contained"
                            padding-bottom="10"
                            fullWidth
                            href={"https://kauth.kakao.com/oauth/authorzie?client_id=c765ccaf81f7ec64ac9adacbe5f8beb7&redirect_uri="+server.ip+"/callback/kakao&response_type=code"}
                            >
                            Kakao
                        </Button>
                        
                        <Button
                            xs={12}
                            m={2}
                            color="primary"
                            variant="contained"
                            fullWidth
                            href={"https://accounts.google.com/o/oauth2/v2/auth?client_id=14050797265-gchj4gpfqu6fmdet41v1g34mc53hdoic.apps.googleusercontent.com&redirect_uri="+server.ip+"/callback/google&response_type=code&scope=profile"}
                        >
                            Google
                        </Button>
                        <Button
                            xs={12}
                            m={2}
                            color="secondary"
                            variant="contained"
                            fullWidth
                            href={"https://github.com/login/oauth/authorize?client_id=2d34711451a62f8f967d&redirect_uri="+server.ip+"/callback/github"}
                        >
                            GitHub
                        </Button>
                        </ThemeProvider>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}