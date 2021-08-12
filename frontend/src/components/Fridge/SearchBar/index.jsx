import React, { useState } from "react";
import { Grid, IconButton, InputBase, Paper, makeStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Breadcrumb from "./Breadcrumb";
import RadioButton from "./RadioButton";
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
}));
const SearchBar = (props) => {
  const classes = useStyles();
  return (
    <Grid container justifyContent="center">
      <Grid container>
        <Grid item xs={2}>
          <Breadcrumb />
        </Grid>
        <Grid item xs={10}>
          <Grid>
            <Paper className={classes.root}>
              <InputBase xs={8} className={classes.input} placeholder="검색어를 입력하세요" />
              <IconButton type="submit" className={classes.iconButton} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        <Grid>
          <RadioButton />
        </Grid>
      </Grid>
    </Grid>
  );
};
export default SearchBar;
