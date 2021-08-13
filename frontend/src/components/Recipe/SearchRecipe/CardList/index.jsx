import { React, useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper, Button, createMuiTheme } from "@material-ui/core";
import { useNowCols } from "../../../../common/MediaQueryHooks";
import catDt from "./dump.json";
import CardItem from "../CardItem";
const useStyles = makeStyles((theme) => ({
  grid: {
    border: "1px solid #dfdfdf",
    textAlign: "center",
    borderRadius: "15px",
    margin: "auto",
    height: "100%",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));
const useGetdata = () => {
  const [catItemDatas, setCatItemDatas] = useState([]);
  const getDatas = async () => {
    setCatItemDatas(catDt);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return catItemDatas;
};
const CardList = () => {
  const classes = useStyles();
  const data = useGetdata();
  return (
    <div className={classes.root}>
      <Grid xs={12}>
        <GridList container>
          {data.map((dt, idx) => (
            <Grid item justifyContent="center" alignItems="center" key={idx} xs={4} lg={3}>
              <Paper className={classes.grid}>
                <CardItem dt={dt} idx={idx} />
              </Paper>
            </Grid>
          ))}
        </GridList>
      </Grid>
    </div>
  );
};
export default CardList;
