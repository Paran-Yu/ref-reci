import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography, Button, createMuiTheme } from "@material-ui/core";
import SearchDt from "../../components/SearchDt";
import IngList from "../../components/ShowIng/IngList";
import Layout from "../../layout";
import SideBar from "../../components/SideBar";
import { Router, Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
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
  list: {
    marginTop: theme.spacing(2),
  },
  link: {
    position: "fixed",
    right: theme.spacing(4),
    top: theme.spacing(20),
  },
  btn: {
    background: "#F19920",
  },
}));
const SecComp = (props) => {
  const { catName } = props.location.state;
  const [cnt, setCnt] = React.useState(0);
  const st = useStyles();
  const baseTheme = createMuiTheme();
  const addCnt = (re) => {
    setCnt(re);
  };
  return (
    <ThemeProvider theme={baseTheme}>
      <Layout />
      <Grid container justifyContent="center" alignItems="center">
        <Typography align="center" variant="h3" gutterBottom className={st.title}>
          나의 냉장고
        </Typography>
        <Link
          to={{
            pathname: "/reci",
            state: cnt,
          }}
          className={st.link}
          style={{ textDecoration: "none" }}
        >
          <Button
            className={st.btn}
            startIcon={<ShoppingCartIcon />}
            variant="contained"
            size="large"
          >
            {cnt}
          </Button>
        </Link>

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
        <Grid className={st.list}>
          <IngList cnt={cnt} addCnt={addCnt.bind()} />
        </Grid>
        <SideBar />
      </Grid>
    </ThemeProvider>
  );
};
export default SecComp;
