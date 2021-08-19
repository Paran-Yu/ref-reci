import { React, useState, useEffect } from "react";
import { TextField, Paper, makeStyles, Card, CardContent, CardMedia } from "@material-ui/core";
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
  chip: {
    margin: theme.spacing(0.5),
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
}));
const DetailModal = (props) => {
  const classes = useStyles();
  const { dt } = props;
  return (
    <Paper component="ul" className={classes.root}>
      <div className={classes.details}>
        <Card elevation={0}>
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
        </Card>
      </div>
      <CardMedia className={classes.cover} image={`${server.ip}/img?id=${dt.productImage}`} />
    </Paper>
  );
};
export default DetailModal;
