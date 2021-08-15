import { React, useState, useEffect } from "react";
import {
  CardContent,
  CardMedia,
  CardActionArea,
  makeStyles,
  Typography,
  Card,
  Modal,
  Fade,
  Backdrop,
  CardActions,
  Chip,
  Paper,
} from "@material-ui/core";
import { Router, Link } from "react-router-dom";
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
  const { dt, idx } = props;
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open, setOpen] = useState(false);
  const [chipData, setChipData] = useState([
    { key: 0, label: "우유" },
    { key: 1, label: "계란" },
    { key: 2, label: "달걀" },
    { key: 3, label: "우유" },
    { key: 4, label: "계란" },
    { key: 5, label: "달걀" },
  ]);
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };
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
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Paper component="ul" className={classes.root}>
            {chipData.map((data) => {
              return (
                <li key={data.key} className={classes.chip}>
                  <Chip label={data.label} onDelete={undefined} className={classes.chip} />
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
