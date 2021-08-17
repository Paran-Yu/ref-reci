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

const getCl2Data = async (url) => {
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
  let cl2Datas;
  const [cnt, setCnt] = useState(0);
  const [subCatName, setSubCatName] = useState("소분류");
  const [customMiddleList, setCustomMiddleList] = useState();
  const [customSmallList, setCustomSmallList] = useState();
  
  let largeList = props.location.state.data;
  if (props.location.state == undefined) {
    catName = "전체";
  } else {
    catName = props.location.state.catName;
  }

  useEffect(async () => {
    cl2Datas = await getCl2Data(`${server.ip}/fridge/classification2?cl1ID=${props.location.state.catID}`);
    console.log(cl2Datas);

    setCustomMiddleList(<MiddleList subCheck={subCheck.bind()} cl2Datas={cl2Datas} />);
  }, []);

  // console.log(largeList);
  const addCnt = (re) => {
    setCnt(re);
  };

  const subCheck = async (c2ID, classification2Name) => {
    setSubCatName(classification2Name);
    console.log(c2ID);

    const datas = await getCl2Data(`${server.ip}/fridge/searchUserProduct?cl2ID=${c2ID}`);
    console.log(datas);
    setCustomSmallList(<SmallList cnt={cnt} addCnt={addCnt.bind()} datas={datas} />)
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
            customMiddleList 
        ) : (
            customSmallList
        )}
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
};

export default Fridge;
