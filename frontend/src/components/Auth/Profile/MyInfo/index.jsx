import React, { useState } from 'react';

import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  btn: {
    margin: theme.spacing(1),
    },
}));


export default function MyInfo(props) {
  const classes = useStyles();
  
  return (
    <div>
      <Typography
      variant="h4">
        내 정보
      </Typography>
      <Box textAlign="center" p={2}>
        <p>냉장고 속에 {props.myFridgeNum}개의 식재료가 있습니다.</p>
        <p>유효기간이 3일 미만인 식재료가 {props.expire3Num}개 있습니다.</p>
        <p>유효기간이 지난 식재료가 {props.expiredNum}개 있습니다.</p>
      </Box>
      <Box textAlign="left">
        <p>닉네임: {props.userName}</p>
        <p>아이디(Email): {props.userID}</p>
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