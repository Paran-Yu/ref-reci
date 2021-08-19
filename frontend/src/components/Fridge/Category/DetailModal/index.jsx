import { React, useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  makeStyles,
  Card,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import server from "../../../../server.json";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    height: 100,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
const DetailModal = (props) => {
  const classes = useStyles();
  const { dt } = props;
  return (
    <Card elevation={0} className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <TextField
            id="date"
            label="유통 기한"
            type="date"
            defaultValue={dt.productShelfLife.split("T")[0]}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </CardContent>
        <div className={classes.controls}>
          <Button variant="contained">변경하기</Button>
        </div>
      </div>
      <CardMedia className={classes.cover} image={`${server.ip}/img?id=${dt.productImage}`} />
    </Card>
  );
};
export default DetailModal;
