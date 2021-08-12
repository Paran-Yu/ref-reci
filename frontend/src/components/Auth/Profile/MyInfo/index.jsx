import React, { useState, useEffect } from 'react';

import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';
import server from '../../../../server.json';

const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(1),
    },
}));

const checkLogin = async(url) => {
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



export default function MyInfo() {
  const classes = useStyles();
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [myFridgeNum, setMyFridgeNum] = useState('');
  const [expireNum, setExpireNum] = useState('');


  useEffect(async() => {
    setUserID('여기 이메일')
    setUserName('여기 닉네임')
    const data = await checkLogin(`${server.ip}/user/isLogin`);
    console.log(data.value);
  },[])


  return (
    <div>
      <Typography
      variant="h4">
        내 정보
      </Typography>
      <Box textAlign="center" p={2}>
        <p>냉장고 속에 {myFridgeNum}개의 식재료가 있습니다.</p>
        <p>유효기간이 3일 미만인 식재료가 {expireNum}개 있습니다.</p>
      </Box>
      <Box textAlign="left">
        <p>닉네임: {userName}</p>
        <p>아이디(Email): {userID}</p>
      </Box>
      <Box p={2}>
        <div >
          <Grid container>
            <Grid item xs={5} className={classes.btn}>
            <Button
            fullWidth
            size="normal"
            variant="contained"
            color= "primary"
            >
              회원정보수정
            </Button>
            </Grid>
            <Grid item xs={5} className={classes.btn}>
            <Button
            fullWidth
            size="normal"
            variant="outlined"
            color= "primary"
            >
              회원탈퇴
            </Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  )
}