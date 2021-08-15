import react from 'react';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography, Divider } from '@material-ui/core';


export default function RecipeDetail() {
  return (
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
  )
}