import React, { useState } from "react";
import { Grid, IconButton, InputBase, Paper, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumb from "../Breadcrumb";
import RadioButton from "../RadioButton";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: "100%",
    background: "#F2EDE7",
  },
  input: {
    marginLeft: theme.spacing(1),
    width: "100%",
  },
  iconButton: {
    padding: 10,
  },
  top: {
    marginTop: theme.spacing(2),
  },
}));
const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container className={classes.top} alignItems="center" justify="center">
        <Grid item xs={2}>
          <Breadcrumb catName={props.catName} />
        </Grid>
        <Grid item xs={7}>
          <Grid>
            <Paper className={classes.root}>
              <InputBase xs={6} className={classes.input} placeholder="검색어를 입력하세요" />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            <RadioButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SearchBar;
