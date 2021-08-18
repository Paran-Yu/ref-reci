import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '100%',
    maxWidth: 200,
  }
}));

const showDday = (date) => {
  if (date < 0) {
    console.log('음수')
    return ('D + ' + String(Math.abs(date)))
  } else {
    return ('D - ' + String(date))
  }
};

// 유통기한 정보가 없는 날짜는 회색으로 색을 바꾸고 클릭했을 때 요 문구가 뜬다.  (플랜 A)
const blankPage = () => {
  return (
    <Box>
      달력에서 날짜를 선택해 주세요.
    </Box>
  )
}

export default function FoodList(props) {
  const classes = useStyles();
  const dDay = showDday(props.foodDday);
  // 빈 페이지 화면
  const blankPage = () => {
    return (
      <Box>
        달력에서 유통기한이 있는 날짜를 선택해 주세요.
      </Box>
    )
  };

  if (props) {
    return (
      <Box m={2}>
        <Card className={classes.root}>
          <CardMedia
            component="img"
            alt="recipe-image"
            className={classes.cover}
            image={props.url}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Box p={1} className={classes.title}>
                <Typography component="h5" variant="h5">
                  {props.foodName}
                </Typography>
                <Chip 
                  label={dDay}
                  color="primary"
                />
              </Box>
              <Divider orientation="horizontal" variant="middle"/>
              <Box p={1} className={classes.title}>
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                <Typography variant="subtitle1" color="textSecondary">
                  {props.foodCount}
                </Typography>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Box>
            </CardContent>
          </div>
        </Card>
      </Box>
    )
  } else {
    return (
      {blankPage}
    )
  }
};
