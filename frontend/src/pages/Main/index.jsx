import React from "react";
import { Grid, makeStyles, createMuiTheme, Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import FavRecList from "../../components/Recipe/RecipeSlide/SlideList";
import { ThemeProvider } from "@material-ui/styles";
import CatList from "../../components/Fridge/Category/LargeList";
import Fab from "../../layout/FloatingActionButton";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";

const useStyles = makeStyles((theme) => ({
  Fav: {
    margin: "auto",
    justifyItems: "center",
    alignItems: "center",
    fontFamily: 'KoPubWorld Bold',
    // fontStyle: 'normal'
  },
  word: {
    color: "#A29D97",
    marginLeft: "10px",
    marginTop: "24px",
    fontFamily: 'KoPubWorld Bold',
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


const Main = () => {
  const baseTheme = createMuiTheme();
  const st = useStyles();
  return (
    <Container fixed>
      <ThemeProvider theme={baseTheme}>
        <TopBar />
        <Grid>
          <Grid container mt={5} spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} className={st.image}>
              <img src={process.env.PUBLIC_URL + '/images/background.png'} style={{ flex: 1, height: "auto", width: "100%" }} />
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
            {/* <SideBar /> */}
            <Fab />
          </Grid>
        </Grid>
        <BottomBar />
      </ThemeProvider>
    </Container>
  );
};

export default Main;
