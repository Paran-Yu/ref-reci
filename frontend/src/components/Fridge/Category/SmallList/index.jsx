import React, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Button, GridListTile, Paper } from "@material-ui/core";
import catDt from "./dump.json";
import IngItem from "../SmallItem";
import { useNowCols } from "../../../../common/MediaQueryHooks";
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
  const len = useNowCols();
  const [arr, setArr] = React.useState({
    cnt: 0,
    arr: [],
  });
  const showDt = (re) => {
    props.addCnt(re);
  };

  return (
    <div className={st.root}>
      <GridList
        container
        cols={Number.isInteger(len) ? len / 2 + 1 : 4}
        style={{ height: len * 200, height: "auto", overflowY: "auto" }}
      >
        {data.map((dt, idx) => (
          <Grid
            item
            justifyContent="center"
            alignItems="center"
            key={idx}
            style={{ height: len * 50 + 50 }}
            style={{ width: len * 50 + 30, height: len * 50 + 30 }}
          >
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
