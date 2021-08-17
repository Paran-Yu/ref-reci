// import React from 'react';
// import { Link } from 'react-router-dom';
// import { makeStyles } from '@material-ui/core/styles';

// import Paper from '@material-ui/core/Paper';
// import ButtonBase from '@material-ui/core/ButtonBase';
// import Typography from '@material-ui/core/Typography';

//       // map 돌려서 서버에서 대분류 받은 다음에 반복을 돌릴까?
//       // 그럼 대분류 들어간 다음에는? 재렌더링해서 소분류를 보여준다
//       // 

// const useStyles = makeStyles((theme) => ({
//   cardroot: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     '& > *': {
//       margin: theme.spacing(1),
//       width: theme.spacing(16),
//       height: theme.spacing(16),
//     },
//   }
//   }));

// // 여기에 map 돌릴 이미지 받아오기

// export default function CatItem(props) {
//   const classes = useStyles();

//   return(
//     <div className={classes.cardroot}>
//       <Paper square elevation={2}>
//         {/* <img src={props.imgurl} /> */}
//         {props.innertext}
//       </Paper>
//     </div>
//   )
// };