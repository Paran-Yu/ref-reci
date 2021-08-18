import Ract, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper } from "@material-ui/core";

// Style
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import createTheme from "@material-ui/core/styles/createTheme";

import MiddleItem from "../MiddleItem";
// import data from "./dump.json";
// Theme ------------------------------------

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

const MiddleList = (props) => {
  const classes = useStyles();
  const data = props.cl2Datas;
  const setSub = (c2ID, classification2Name) => {
    props.subCheck(c2ID, classification2Name);
  };
  return (
    <div className={classes.root}>
      <Grid xs={10}>
        <GridList container>
          {data.map((dt, idx) => {
            return (
              <Grid item key={idx} dt={dt} xs={4} lg={3} spacing={3} className={classes.MainGrid}>
                <Paper className={classes.grid} fullwidth>
                  <MiddleItem dt={dt} idx={idx} setSub={setSub.bind()} />
                </Paper>
              </Grid>
            );
          })}
        </GridList>
      </Grid>
    </div>
  );
};
export default MiddleList;
