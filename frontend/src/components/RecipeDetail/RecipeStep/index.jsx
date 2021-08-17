import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme) => ({

}));

function createStepData(num, contents, imageurl) {
  return { num, contents, imageurl };
};

const cardstyles = {
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '200px',
  },
  media: {
    width: '100%',
    maxWidth: 500,
  }
}
const steps = [
  createStepData('1', '닭봉 2팩, 갯수로는 20개를 준비해요중불', "http://img.danawa.com/cms/img/images/000389/20171108024157592_IBYNSQCZ.jpg"),
  createStepData('2', '닭봉이 잠기게 우유를 부은 후 30분간 재워 잡내를 제거해줍니다', "http://img.danawa.com/cms/img/images/000389/20171108024157592_IBYNSQCZ.jpg"),
  createStepData('3', '30분 후, 우유를 헹궈내고 체에 밭쳐 물기를 빼주세요', "http://img.danawa.com/cms/img/images/000389/20171108024157592_IBYNSQCZ.jpg"),
]

const stepcards = steps.map((step) => {
  return (
    <Grid container alignItems="center">
      <Grid item xs={12} md={6}>
        <img style={cardstyles.media} src={step.imageurl} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Box p={1}>
          <Chip label={step.num} />
          {step.contents}
        </Box>
      </Grid>
    </Grid>
  )
})


export default function RecipeStep() {
  const classes = useStyles();
  return (
    <Box p={5}>
      {stepcards}
    </Box>
  )
}