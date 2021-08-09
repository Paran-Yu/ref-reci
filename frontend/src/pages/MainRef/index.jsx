import React from "react";
import { Grid, makeStyles, createMuiTheme, Typography } from "@material-ui/core";
import FavRecList from "../../components/MainRef/FavRecList";
import { ThemeProvider } from "@material-ui/styles";
import CatList from "../../components/MainCat/CatList";
import Layout from "../../layout";
import { ReactComponent as Logo } from "../../logo.svg";
import SideBar from "../../components/SideBar";
import backGround from "../../images/background.png";
const useStyles = makeStyles((theme) => ({
  Fav: {
    margin: "auto",
    justifyItems: "center",
    alignItems: "center",
  },
  word: {
    color: "#A29D97",
    marginLeft: "10px",
    marginTop: "20px",
  },
  title: {
    color: "#45423C",
    marginTop: "60px",
    marginBottom: "60px",
  },
  image: {
    height: "50%",
  },
}));
const MainRef = () => {
  const baseTheme = createMuiTheme();
  const st = useStyles();
  return (
    <ThemeProvider theme={baseTheme}>
      <Layout />
      <Grid>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12} className={st.image}>
            <img src={backGround} style={{ flex: 1, height: "auto", width: "100%" }} />
          </Grid>
          <Grid item xs={10} className={st.Fav} id={1} style={{ margin: "" }}>
            <Typography align="left" variant="h6" gutterBottom className={st.word}>
              인기 폭주! 사람들이 가장 많이 찾았어요
            </Typography>
            <FavRecList />
          </Grid>
          <Grid item xs={10} className={st.Fav} id={2}>
            <Typography align="left" variant="h6" gutterBottom className={st.word}>
              신작 레시피 도착!
            </Typography>
            <FavRecList />
          </Grid>
          <Grid item xs={12} className={st.Fav}>
            <Typography align="center" variant="h3" gutterBottom className={st.title}>
              나의 냉장고
            </Typography>
            <Grid>
              <CatList />
            </Grid>
          </Grid>
          <SideBar />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default MainRef;
