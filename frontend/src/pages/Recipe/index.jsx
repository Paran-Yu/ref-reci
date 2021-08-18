import React, { useEffect, useState } from "react";
import { Grid, makeStyles, Typography, Divider, Box } from "@material-ui/core";
import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import CardList from "../../components/Recipe/SearchRecipe/CardList";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import SearchBar from "../../components/Recipe/SearchBar";
import FloatingActionButton from "../../layout/FloatingActionButton";
import Pagination from '@material-ui/lab/Pagination';
import createTheme from '@material-ui/core/styles/createTheme';

// Server 
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
});

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
  paginate: {
    display: "flex",
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center'
  }
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

  const [allFoodItem, setAllFoodItems] = useState([]);
  const [customSearchBar, setCustomSearchBar] = useState();
  const [customCardList, setCustomCardList] = useState();

  const [recipeid1, setrecipeid1] = useState([]);
  const [recipeid2, setrecipeid2] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);



  function handleChildChange(recipes, selectedArr) {
    console.log('렌더 전')
    console.log("recipes", recipes)
    console.log('렌더 타이밍1')
    setrecipeid2(recipes[1])
    setrecipeid1(recipes[0])
    // setrecipeid1(recipes)
    // console.log(recipes)
    console.log('렌더 타이밍2')
    console.log('렌더 후')
  }

  useEffect(async () => {
    const allFoodItems = await getDatas(`${server.ip}/fridge/read`);
    items = allFoodItems;
    setAllFoodItems(items);

    setCustomSearchBar(<SearchBar datas={items} onChildChange={handleChildChange} />)
  }, [])

  // 현재 페이지 가져오기
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentrecipes = recipeid1.slice(indexOfFirstPost, indexOfLastPost);
  const currentrecipes2 = recipeid2.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (event, value) => {
    setCurrentPage(value)
  };

  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">레시피 정리</Typography>
        <Divider />
        {customSearchBar}
        <CardList datas={currentrecipes} datas2={currentrecipes2}/>
      </Box>
      <Pagination onChange={paginate}
        page={currentPage}
        count={Math.ceil(recipeid1.length / postPerPage)}
        color="primary"
        className={classes.paginate} />
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
};
export default Recipe;
