import { useState, React } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Divider, makeStyles, Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Breadcrumb from "../../components/Fridge/Breadcrumb";
import LargeList from "../../components/Fridge/Category/LargeList";
import SearchBar from "../../components/Recipe/SearchBar";
import RadioButton from "../../components/Fridge/RadioButton";
import ShowChoiceButton from "../../components/Fridge/ShowChoiceButton";

import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import FloatingActionButton from "../../layout/FloatingActionButton";
import CatItem from "../../components/Fridge/Category/CatItem";
import SmallList from "../../components/Fridge/Category/SmallList";

export default function Fridge(props) {
  let catName = "";
  if (props.location.state == undefined) {
    catName = "전체";
  } else {
    catName = props.location.state.catName;
  }
  const [cnt, setCnt] = useState(0);
  const [back, setBack] = useState(1);
  const addCnt = (re) => {
    setCnt(re);
  };

  const toBack = (re) => {
    setBack(re);
    if (catName != "전체") setBack(2);
    console.log("Main : " + back);
  };
  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">나의 냉장고</Typography>
        <Divider />
        <Box justifyContent="space-between" alignItems="center">
          <Breadcrumb catName={catName} toBack={toBack.bind()} />
          <ShowChoiceButton cnt={cnt} />
        </Box>
        <RadioButton />
        {/* <SearchBar />
        {catName == "전체" ? (
          <LargeList num={back} />
        ) : (
          <SmallList cnt={cnt} addCnt={addCnt.bind()} />
        )} */}
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
}
