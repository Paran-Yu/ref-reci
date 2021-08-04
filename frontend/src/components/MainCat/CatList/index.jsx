import Ract, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper } from "@material-ui/core";
import catDt from "./dump.json";
import CatItem from "../CatItem";
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
    width: "80%",
    height: "80%",
  },
}));

const CatList = () => {
  const st = useStyles();
  const data = useGetdata();
  return (
    <div className={st.root}>
      <GridList container cols={4} className={st.list}>
        {data.map((dt, idx) => {
          let color;
          if (idx == 0) {
            console.log(idx);
            color = "#F19920";
          }
          return (
            <Grid item justifyContent="center" alignItems="center" key={idx} dt={dt} xs={3}>
              <Paper className={st.grid} style={{ backgroundColor: color }}>
                <CatItem dt={dt} />
              </Paper>
            </Grid>
          );
        })}
      </GridList>
    </div>
  );
};
export default CatList;
