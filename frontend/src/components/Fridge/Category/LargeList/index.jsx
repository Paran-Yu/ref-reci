import Ract, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper } from "@material-ui/core";

// Style
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createTheme";

import catDt from "./dump.json";
import CatItem from "../LargeItem";
import catDt2 from "./dump copy.json";

// Theme -------------------------------------
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
    height: "100%",
  },
  MainGrid: {
    marginBottom: theme.spacing(2),
  },
}));
// -------------------------------------------

const LargeList = (props) => {
  const classes = useStyles();
  const data = props.datas; //대분류 전체(컬럼 2줄)
  return (
    <div className={classes.root}>
      <Grid xs={10}>
        <GridList container>
          {data.map((dt, idx) => { //dt: 대분류 전체를 쪼갬
            let color;
            if (idx == 0) {
              color = "#F19920";
            }
            return (
              <Grid item key={idx} dt={dt} xs={4} lg={3} spacing={3} className={classes.MainGrid}>
                <Paper className={classes.grid} fullwidth style={{ backgroundColor: color }}>
                  <CatItem dt={dt} idx={idx} data={data} />
                </Paper>
              </Grid>
            );
          })}
        </GridList>
      </Grid>
    </div>
  );
};
export default LargeList;
