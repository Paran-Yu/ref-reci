import React, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Button, GridListTile, Paper } from "@material-ui/core";
import catDt from "./dump.json";
import IngItem from "../IngItem";

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
    width: "100%",
    justifyContent: "center",
  },
  grid: {
    border: "1px solid #dfdfdf",
    textAlign: "center",
    borderRadius: "15px",
    margin: theme.spacing(1),
    height: "80%",
  },
  list: {
    width: "100%",
  },
}));

const IngList = (props) => {
  const st = useStyles();
  const data = useGetdata();
  const [cnt, setCnt] = React.useState(0);
  const [arr, setArr] = React.useState({
    cnt: 0,
    arr: [],
  });
  const showDt = (re) => {
    console.log(re);
    props.addCnt(re);
  };

  return (
    <div className={st.root}>
      <GridList container cols={4} className={st.list}>
        {data.map((dt, idx) => (
          <Grid item justifyContent="center" alignItems="center" key={idx} xs={3}>
            <Paper className={st.grid}>
              <IngItem dt={dt} cnt={props.cnt} arr={arr} showDt={showDt.bind()} />
            </Paper>
          </Grid>
        ))}
      </GridList>
    </div>
  );
};
export default IngList;
