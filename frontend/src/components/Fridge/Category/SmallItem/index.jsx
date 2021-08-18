import { React, useState, useEffect } from "react";
import {
  Fade,
  Backdrop,
  CardActionArea,
  makeStyles,
  Modal,
  Card,
  Button,
  Typography,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import IngTask from "../DetailModal";
import AddIcon from "@material-ui/icons/Add";

import server from "../../../../server.json";

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
    // height: "100%",
  },
  card2: {
    // height: "100%",
    border: "3px solid #F19920 ",
  },
  media: {
    height: 200,
  },
}));

const SmallItem = (props) => {
  const { dt, idx } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [cnt, setCnt] = useState(0);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  let check = false;
  const addDt = () => {
    handleClose();
    console.log("item");
    console.log(props.selectIng);
    for (let i = 0; i < props.selectIng.length; i++) {
      if (props.selectIng[i] == dt.productName) {
        check = true;
        break;
      }
    }
    let ex = props.selectIng;
    console.log("같은게 있습니까?: " + check);
    if (!check) {
      ex = ex.concat(dt.productName);
      /*if (cnt % 2 == 1) {
        ex = props.selectIng.filter((Ing) => Ing != dt.productName);
        setCnt(cnt - 1);
      } else setCnt(cnt + 1);*/
      console.log("add");
    } else {
      ex = ex.filter((Ing) => Ing != dt.productName);
      /*if (cnt % 2 == 0) {
        ex = props.selectIng.concat(dt.productName);
        setCnt(cnt + 1);
      } else setCnt(cnt - 1);*/
      console.log("delete");
    }
    console.log("change");
    console.log(ex);
    // console.log("t/f");
    // console.log(cnt);

    props.showDt(ex);
  };
  return (
    <div className={classes.btn}>
      <Card onClick={handleOpen} className={!check ? classes.card : classes.card2}>
        {/* <CardActionArea className={classes.card}>{dt.productName}</CardActionArea> */}

        <CardActionArea>
          <CardMedia className={classes.media} image={`${server.ip}/img?id=${dt.productImage}`} />
          <CardContent>
            <Typography variant="h5" component="h2">
              {dt.productName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              수량: {dt.productCount}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              유통기한: {dt.productShelfLife}
            </Typography>
          </CardContent>
        </CardActionArea>
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
            <h2>{dt.productName}</h2>
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
