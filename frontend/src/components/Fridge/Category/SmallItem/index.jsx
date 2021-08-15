import { React, useState, useEffect } from "react";
import { Fade, Backdrop, CardActionArea, makeStyles, Modal, Card, Button } from "@material-ui/core";
import { Router, Link } from "react-router-dom";
import IngTask from "../DetailModal";
import AddIcon from "@material-ui/icons/Add";

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
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  btn: {
    width: "100%",
    height: "100%",
  },
  card: {
    height: "100%",
  },
  card2: {
    height: "100%",
    border: "3px solid #F19920 ",
  },
}));

const SmallItem = (props) => {
  const { dt, idx } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const addDt = (event) => {
    setFlag(!flag);
    if (flag) {
      // props.arr.showA(props.arr.concat(dt.CatName))
      props.showDt(props.cnt - 1);
    } else {
      props.showDt(props.cnt + 1);
    }
  };
  return (
    <div className={classes.btn}>
      <Card onClick={handleOpen} className={!flag ? classes.card : classes.card2}>
        <CardActionArea className={classes.card}>{dt.CatName}</CardActionArea>
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
            <Button size="small" onClick={addDt.bind()}>
              <AddIcon />
            </Button>
            <IngTask />
          </div>
        </Fade>
      </Modal>
    </div>
  );
};
export default SmallItem;
