import React from "react";
import { Grid, makeStyles, Typography, Divider, Box } from "@material-ui/core";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import CardList from "../../components/Recipe/SearchRecipe/CardList";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import SearchBar from "../../components/Fridge/SearchBar";
import FloatingActionButton from "../../layout/FloatingActionButton";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    width: "100%",
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
const Recipe = () => {
  const classes = useStyles();
  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">레시피 정리</Typography>
        <Divider />
        {/* props로 SearchBar에 소분류, 재료를 넘겨주세요  */}
        <SearchBar />
        <CardList />
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
};
export default Recipe;
