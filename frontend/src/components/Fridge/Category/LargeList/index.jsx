import React, { useState, useEffect } from "react";
import { Grid, makeStyles, GridList, Paper } from "@material-ui/core";
import Box from '@material-ui/core/Box';
import LargeItem from "../LargeItem";

// Theme -------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  MainGrid: {
    marginBottom: theme.spacing(2),
  },
  media: {
    width: '100%',
    height: '100%',
  },
}));
// -------------------------------------------

const LargeList = (props) => {
  const classes = useStyles();
  const data = props.datas;
  return (
    <Box m={3} className={classes.root}>
      <Grid container>
        {data.map((dt, idx) => {
          return (
            <Grid item key={idx} dt={dt} xs={4} lg={3} className={classes.MainGrid}>
              <LargeItem dt={dt} idx={idx} data={data} className={classes.media} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};
export default LargeList;
