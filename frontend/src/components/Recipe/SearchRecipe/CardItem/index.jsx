import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';


import DetailModal from "../DetailModal";
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
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  // const [chipData, setChipData] = useState([
  //   { key: 0, label: "우유" },
  //   { key: 1, label: "계란" },
  //   { key: 2, label: "달걀" },
  //   { key: 3, label: "우유" },
  //   { key: 4, label: "계란" },
  //   { key: 5, label: "달걀" },
  // ]);
  // const handleDelete = (chipToDelete) => () => {
  //   setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  // };
  // console.log(handleDelete)
  console.log("dt2",dt2)
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
                  <Chip label={data} className={classes.chip} />
                </li>
              );
            })}
          </Paper>
        </CardActions>
      </Card>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2>{dt.CatName}</h2>
            <DetailModal />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default CardItem;
