import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import FavRecList from "../../components/Recipe/RecipeSlide/SlideList";
import CatList from "../../components/Fridge/Category/LargeList";
import Fab from "../../layout/FloatingActionButton";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";

import { createTheme, ThemeProvider } from '@material-ui/core/styles';

// server
import axios from 'axios';
import server from '../../server.json';

const mytheme = createTheme({
  palette: {
    primary: {
      light: '#f2da9e',
      main: '#f9bc15',
      dark: '#f19920',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f2ede7',
      main: '#a29d97',
      dark: '#45423c',
      contrastText: '#fff',
    },
    success: {
      light: '#f2ede7',
      main: '#fee500',
      dark: '#45423c',
      contrastText: '#191600',
    },
  },
  typography: {
    fontFamily: "'KoPubWorld', Munhwajae, jeju",
    fontStyle: "normal",
    fontWeight: "Bold"
  },
});



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
    height: "40%",
  },
}));

const getFavData = async (url) => {
  try {
    const data = await axios({
      method: 'get',
      url: url,
      headers: {
        accept: 'application/json',
      },
    });
    return data.data;
  }
  catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

const Main = () => {
  const st = useStyles();
  const [favRecipe, setFavRecipes] = useState();
  const [recentRecipe, setRecentRecipes] = useState();

  useEffect(async () => {
    const favRecipeData = await getFavData(`${server.ip}/recipe/tenFavorRecipe`);
    const recentRecipeData = await getFavData(`${server.ip}/recipe/tenRecentRecipe`);

    // const favRecipes = ;
    setFavRecipes(<FavRecList datas={favRecipeData} />);

    const recentRecipes = <FavRecList datas={recentRecipeData} />;
    setRecentRecipes(recentRecipes);
  }, [])

  return (
    <ThemeProvider theme={mytheme}>
      <Container fixed >
        <TopBar />
        <Grid>
          <Grid container mt={5} spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} className={st.image}>
              <img src={process.env.PUBLIC_URL + '/images/background.png'} style={{ flex: 1, height: "auto", width: "100%" }} />
            </Grid>
            <Grid item xs={10} className={st.Fav} id={1} style={{ maxWidth: "100%", width: "100%" }}>
              <Typography align="left" variant="h6" gutterBottom className={st.word}>
                인기 폭주! 사람들이 가장 많이 찾았어요
              </Typography>
              {favRecipe}
            </Grid>
            <Grid item xs={10} className={st.Fav} id={2} style={{ maxWidth: "100%", width: "100%" }}>
              <Typography align="left" variant="h6" gutterBottom className={st.word}>
                신작 레시피 도착!
              </Typography>
              {recentRecipe}
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
      </Container>
    </ThemeProvider>
  );
};

export default Main;