import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography, Divider, Box } from "@material-ui/core";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import CardList from "../../components/Recipe/SearchRecipe/CardList";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import SearchBar from "../../components/Fridge/SearchBar";
import FloatingActionButton from "../../layout/FloatingActionButton";

// Server 
import axios from 'axios';
import server from '../../server.json';

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

const getDatas = async (url) => {
  try {
    const data = await axios({
      method: 'get',
      url: url,
      withCredentials: true,
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

let items; 

const Recipe = () => {
  const classes = useStyles();

  const [allFoodItems, setAllFoodItems] = useState();
  const [customSearchBar, setCustomSearchBar] = useState();

  useEffect(async () => {
    const allFoodItems = await getDatas(`${server.ip}/fridge/read`);
    items = allFoodItems;

    function handleChildChange(recipes, selectedArr) {
      
    }

    setCustomSearchBar(<SearchBar datas={items} onChildChange={handleChildChange} />)
  }, [])

  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">레시피 정리</Typography>
        <Divider />
        {customSearchBar}
        <CardList />
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
};
export default Recipe;
