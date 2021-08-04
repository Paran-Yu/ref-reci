import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import SearchDt from "../../components/SearchDt";
import IngList from "../../components/ShowIng/IngList";
import Layout from "../../layout";
import SideBar from "../../components/SideBar";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    alignItems: "center",
    width: "80%",
    marginTop: "1rem",
  },
  title: {
    color: "#45423C",
    marginTop: "60px",
  },
}));
const SecComp = (props) => {
  const { catName } = props.location.state;
  const st = useStyles();
  return (
    <div>
      <Layout />
      <Grid container justifyContent="center" alignItems="center">
        <Typography align="center" variant="h3" gutterBottom className={st.title}>
          나의 냉장고
        </Typography>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            borderBottom: "4px solid #aaa",
            lineHeight: "0.1em",
            margin: "10px 30px 0px",
          }}
        ></div>
        <Grid className={st.root}>
          <SearchDt catName={catName} />
        </Grid>
        <Grid>
          <IngList />
        </Grid>
        <SideBar />
      </Grid>
    </div>
  );
};
export default SecComp;
