import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import server from '../../../../server.json';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    width: "100%",
  },
  chip: {
    margin: theme.spacing(1),
  },
  media: {
    height: 200,
  },
}));

const CardItem = (props) => {
  const { dt, dt2, idx } = props;
  const classes = useStyles();
  const handleOpen = () => {
    window.location.href = `http://localhost:3000/rec/${dt.rID}`
  };

  if (dt2.count === undefined) dt2.count = 0;
  return (
    <div>
      <Card onClick={handleOpen}>
        <CardActionArea>
          <CardMedia className={classes.media} image={`${server.ip}/img?id=${dt.recipeImage}`} />
          <CardContent>
            <Typography variant="h5" component="h2">
              {dt.recipeName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {dt.recipeTime}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {dt.count===undefined? "포함된 검색 재료의 개수: 0" : `포함된 검색 재료의 개수: ${dt.count}`}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Paper component="ul" className={classes.root}>
            {dt2.map((data, idx) => {
              return (
                <li key={data.key} className={classes.chip}>
                  {(idx < dt.count) ? (<Chip label={data} className={classes.chip} color="primary" />) :
                  (<Chip label={data} className={classes.chip} />)}
                </li>
              );
            })}
          </Paper>
        </CardActions>
      </Card>
    </div>
  );
};
export default CardItem;
