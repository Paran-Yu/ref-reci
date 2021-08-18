import React, { useState, useEffect } from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
// import FavRecList from "../../components/Recipe/RecipeSlide/SlideList";
import Slide from "../../components/Recipe/RecipeSlide/NewSlide";
import LargeList from "../../components/Fridge/Category/LargeList";
import Fab from "../../layout/FloatingActionButton";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import Box from '@material-ui/core/Box';
import Carousel from '../../components/Carousel';

// server
import axios from "axios";
import server from "../../server.json";

const useStyles = makeStyles((theme) => ({
  Fav: {
    margin: "auto",
    justifyItems: "center",
    alignItems: "center",
    fontFamily: "KoPubWorld Bold",
    // fontStyle: 'normal'
  },
  word: {
    color: "#A29D97",
    marginLeft: "10px",
    marginTop: "24px",
    fontFamily: "KoPubWorld Bold",
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
      method: "get",
      url: url,
      headers: {
        accept: "application/json",
      },
    });
    return data.data;
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
};

const Main = () => {
  const st = useStyles();
  const [favRecipe, setFavRecipes] = useState();
  const [recentRecipe, setRecentRecipes] = useState();
  const [largeList, setLargeList] = useState();

  useEffect(async () => {
    const favRecipeData = await getFavData(`${server.ip}/recipe/tenFavorRecipe`);
    const recentRecipeData = await getFavData(`${server.ip}/recipe/tenRecentRecipe`);
    const largeListData = await getFavData(`${server.ip}/fridge/classification1`);

    // const favRecipes = ;
    setFavRecipes(<Slide datas={favRecipeData} />);
    setRecentRecipes(<Slide datas={recentRecipeData} />);
    setLargeList(<LargeList datas={largeListData} />);
  }, []);

  return (
    <Container fixed>
      <TopBar />
      <Box my={5}>
        <Grid>
          <Grid container mt={5} spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} className={st.image}>
              {/* <img
                src={process.env.PUBLIC_URL + "/images/background.png"}
                style={{ flex: 1, height: "auto", width: "100%" }}
              /> */}
              <Carousel />
            </Grid>
            <Grid item xs={12} className={st.Fav} id={1} style={{ maxWidth: "100%", width: "100%" }}>
              <Typography align="left" variant="h6" gutterBottom className={st.word}>
                인기 폭주! 사람들이 가장 많이 찾았어요
              </Typography>
              {favRecipe}
            </Grid>
            <Grid item xs={12} className={st.Fav} id={2} style={{ maxWidth: "100%", width: "100%" }}>
              <Typography align="left" variant="h6" gutterBottom className={st.word}>
                신작 레시피 도착!
              </Typography>
              {recentRecipe}
            </Grid>
            <Grid item xs={12} className={st.Fav}>
              <Typography align="center" variant="h4" gutterBottom className={st.title}>
                나의 냉장고
              </Typography>
            </Grid>
            <Grid item xs={12}>{largeList}</Grid>
          </Grid>
        </Grid>
      </Box>
      <Fab />
      <BottomBar />
    </Container>
  );
};

export default Main;
