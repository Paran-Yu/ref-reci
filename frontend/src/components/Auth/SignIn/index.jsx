// React, Router
import {useState, React} from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';

// Core
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
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

// Icons
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Background from '../../../images/authimg.png';

// Server 
import axios from 'axios';
import server from '../../../server.json';

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
        console.log(`url: ${url}`);
        console.log(`data.data: ${data.data}`);
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
        // backgroundImage: `${authimg}`,
        backgroundImage: "url(" + Background + ")",
        // backgroundImage: 'url(https://source.unsplash.com/random)',
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


export default function SignInSide() {
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
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="아이디(E-mail)"
                            name="email"
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
                            label="Remember me"
                        />
                        <Button
                            //type="submit"
                            fullWidth
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
                        <ButtonGroup
                            variant="contained"
                        >
                            <Button
                                xs={12}
                                component={RouterLink}
                                to="/#"
                                color="yellow"
                            >
                                Kakao
                            </Button>
                            <Button
                                xs={12}
                                component={RouterLink}
                                to="/#"
                                color="blue"
                            >
                                Google
                            </Button>
                            <Button
                                xs={12}
                                component={RouterLink}
                                to="/#"
                                Backgroundcolor="black"
                            >
                                GitHub
                            </Button>
                        </ButtonGroup>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}