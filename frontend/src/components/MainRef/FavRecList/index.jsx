import React, { useState, useEffect } from "react";
import { GridList, makeStyles, GridListTile } from "@material-ui/core";
import FavDt from "./dump.json";
import FavItem from "../FavItem";
import { useNowCols } from "../../../common/MediaQueryHooks";

const useGetdata = () => {
  const [favItemDatas, setFavItemDatas] = useState([]);
  const getDatas = async () => {
    setFavItemDatas(FavDt);
  };
  useEffect(() => {
    getDatas();
  }, []);
  return favItemDatas;
};
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    wrap: "nowrap",
    justifyContent: "space-around",
    overflow: "hidden",
    marginTop: 0,
  },
  gridList: {
    flexWrap: "nowrap",
    padding: 20,
    backgroundColor: "#F2EDE7",
  },
  grid: {
    width: "30wh",
  },
}));

const FavRecList = () => {
  const Favs = useGetdata();
  const classes = useStyles();
  const len = useNowCols();
  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={Number.isInteger(len) ? len : 1}>
        {Favs.map((dt, idx) => (
          <GridListTile key={idx} className={classes.grid} alignItems="center" justify="center">
            <FavItem dt={dt} idx={idx} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default FavRecList;
