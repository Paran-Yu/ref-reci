import React from 'react';
import { Container, Box, Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import TopBar from '../../../layout/TopBar';
import BottomBar from '../../../layout/BottomBar';
import FloatingActionButton from '../../../layout/FloatingActionButton';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    maxWidth: '100%',
    height: '100%',
  },
}));


export default function RecipeDetail() {
  const classes = useStyles();

  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Box my={1}>
          <Paper>
            <Typography>레시피 제목</Typography>
            <Grid container alignItems="center">
              <Grid item xs={12} sm={6}>
                <img src="https://t1.daumcdn.net/cfile/tistory/9956783F5B712EE92F" />
              </Grid>
              <Divider />
              <Grid item xs={12} sm={6}>
                <Box p={1}>
                  레시피 한줄 소개입니다. 레시피 한줄 소개입니다. 레시피 한줄 소개입니다. 레시피 한줄 소개입니다. 레시피 한줄 소개입니다. 레시피 한줄 소개입니다. 
                </Box>
                <Box p={1}>
                  인분, 시간, URL복사
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box my={1}>
          <Paper>
            상세 조리 과정 여기 데이터 어떻게 넘어와요?
          </Paper>
        </Box>
      </Box>
      <BottomBar />
      <FloatingActionButton />
    </Container>
  )
};