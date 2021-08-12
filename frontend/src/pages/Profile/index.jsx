import React, {useState, useEffect} from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import MyInfo from '../../components/Auth/Profile/MyInfo';
import QRCode from '../../components/Auth/Profile/QRCode';
import FavRecipe from "../../components/Recipe/FavRecipe";

import Fab from "../../layout/FloatingActionButton";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";


// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


// Core
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import createTheme from '@material-ui/core/styles/createTheme';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import BottomNavigation from '@material-ui/core/BottomNavigation';

// Server 
import axios from 'axios';
import server from '../../server.json';


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

const getUserData = async (url) => {
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

export default function Profile({history}) {
  const classes = useStyles();

  const [uID, setUID] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [myFridgeNum, setMyFridgeNum] = useState('');
  const [expire3Num, setExpire3Num] = useState('');
  const [expiredNum, setExpiredNum] = useState('');

  const [recipeDatas, setRecipeDatas ] = useState();

  useEffect(async () => {
    //const loginData = await getUserData(`${server.ip}/user/isLogin`);
    // if (loginData.value) {
    //   //필요한 데이터 가져오기
    //   setUID(loginData.value);
    //   setUserID('여기 이메일')
    //   setUserName('여기 닉네임')
    //   setMyFridgeNum()
    //   setExpireNum()
    // }
    // else {
    //   console.log(data.value);
    //   history.replace('/signin');
    // }

    const userInfoData = await getUserData(`${server.ip}/user/userInfo`);
    setUserID(userInfoData.userID);
    setUserName(userInfoData.userName);
    setMyFridgeNum(userInfoData.foodCount);
    setExpire3Num(userInfoData.expire3FoodCount);
    setExpiredNum(userInfoData.expiredFoodCount);

    const favRecipeData = await getUserData(`${server.ip}/user/recipeInfo`);
    console.log(favRecipeData)
    console.log(favRecipeData[0].rName)

    const recipeItems = favRecipeData.map((recipeData) => {
      return (
        <Grid item key={recipeData} xs={12} sm={4} md={3} lg={2}>
          <Card className={classes.root}>
            <FavRecipe rName={recipeData.rName} rIntroduce={recipeData.rIntroduce} url={`${server.ip}/img?id=${recipeData.rImage}`} />
          </Card>
        </Grid>
      )
    })
    setRecipeDatas(recipeItems);
  }, [])
  
  return (
    <Container fixed >
      <ThemeProvider theme={mytheme}>
      <TopBar />
      <Typography
      variant="h3"
      >
        마이페이지
      </Typography>
      <Divider variant="middle" />
      <Box m={3}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <QRCode uid={uID}/>
          </Grid>
          <Grid item xs={12} md={6}>
              <MyInfo userID={userID} userName={userName} myFridgeNum={myFridgeNum} expire3Num={expire3Num} expiredNum={expiredNum} />
          </Grid>
        </Grid>
      </Box>
      <Box my={3}>
          <h1>즐겨찾기한 레시피</h1>
          <Grid container>
            {recipeDatas}
          </Grid>
      </Box>
      <Fab />
      <BottomBar />
      </ThemeProvider>
    </Container>
  )
}