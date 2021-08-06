import Ract, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper } from "@material-ui/core";
import catDt from "./dump.json";
import CatItem from "../CatItem";
import { useNowCols } from "../../../common/MediaQueryHooks";
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
  },
  grid: {
    border: "1px solid #dfdfdf",
    textAlign: "center",
    borderRadius: "15px",
    margin: "auto",
  },
}));

const CatList = () => {
  const st = useStyles();
  const data = useGetdata();
  const len = useNowCols();
  console.log(len);
  return (
    <div className={st.root}>
      <Grid xs={10}>
        <GridList
          container
          cols={Number.isInteger(len) ? len / 2 + 1 : 4}
          style={{ height: len * 200, height: "auto", overflowY: "auto" }}
        >
          {data.map((dt, idx) => {
            let color;
            if (idx == 0) {
              color = "#F19920";
            }
            return (
              <Grid item key={idx} dt={dt} style={{ height: len * 50 + 50 }}>
                <Paper
                  className={st.grid}
                  style={{ backgroundColor: color, width: len * 50 + 30, height: len * 50 + 30 }}
                >
                  <CatItem dt={dt} />
                </Paper>
              </Grid>
            );
          })}
        </GridList>
      </Grid>
    </div>
  );
};
export default CatList;
