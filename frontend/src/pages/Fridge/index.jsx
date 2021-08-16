import { useState, React, useEffect } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Divider, makeStyles, Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Breadcrumb from "../../components/Fridge/Breadcrumb";
import LargeList from "../../components/Fridge/Category/LargeList";
import SearchBar from "../../components/Fridge/Category/SearchBar";
import RadioButton from "../../components/Fridge/RadioButton";
import ShowChoiceButton from "../../components/Fridge/ShowChoiceButton";

import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import FloatingActionButton from "../../layout/FloatingActionButton";
import CatItem from "../../components/Fridge/Category/CatItem";
import SmallList from "../../components/Fridge/Category/SmallList";
import MiddleList from "../../components/Fridge/Category/MiddleList";

// server
import axios from "axios";
import server from "../../server.json";

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

const Fridge = (props) => {
  let catName = "";
  const [cnt, setCnt] = useState(0);
  const [subCatName, setSubCatName] = useState("소분류");
  let largeList = props.location.state.data;
  if (props.location.state == undefined) {
    catName = "전체";
  } else {
    catName = props.location.state.catName;
  }

  console.log(catName);
  const addCnt = (re) => {
    setCnt(re);
  };

  const subCheck = (re) => {
    setSubCatName(re);
  };

  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">나의 냉장고</Typography>
        <Divider />
        <Box justifyContent="space-between" alignItems="center">
          <Breadcrumb catName={catName} subCatName={subCatName} />
          <ShowChoiceButton cnt={cnt} />
        </Box>
        <RadioButton />
        {catName == "전체" ? (
          <LargeList datas={largeList} />
        ) : subCatName == "소분류" ? (
          <MiddleList subCheck={subCheck.bind()} />
        ) : (
          <SmallList cnt={cnt} addCnt={addCnt.bind()} />
        )}
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
};

export default Fridge;
