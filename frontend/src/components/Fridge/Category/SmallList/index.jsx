import { React, useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper } from "@material-ui/core";
import catDt from "./dump.json";
import IngItem from "../SmallItem";
import { PropTypes } from "react";

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
  grid: {
    border: "1px solid #dfdfdf",
    textAlign: "center",
    borderRadius: "15px",
    margin: "auto",
    height: "100%",
  },
  list: {
    width: "100%",
  },
  MainGrid: {
    marginBottom: theme.spacing(2),
  },
}));

const SmallList = (props) => {
  const classes = useStyles();
  const data = useGetdata();
  const [arr, setArr] = useState({
    cnt: 0,
    arr: [],
  });
  const showDt = (re) => {
    props.addCnt(re);
  };

  return (
    <div className={classes.root}>
      <Grid xs={12}>
        <GridList container>
          {data.map((dt, idx) => (
            <Grid item className={classes.MainGrid} key={idx} xs={4} lg={3}>
              <Paper className={classes.grid}>
                <IngItem dt={dt} cnt={props.cnt} arr={arr} showDt={showDt.bind()} />
              </Paper>
            </Grid>
          ))}
        </GridList>
      </Grid>
    </div>
  );
};
export default SmallList;
