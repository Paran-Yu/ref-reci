import { useState, React, useRef, useEffect } from "react";
import { Divider, makeStyles, Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Breadcrumb from "../../components/Fridge/Breadcrumb";
import SearchBar from "../../components/Fridge/Category/SearchBar";
import RadioButton from "../../components/Fridge/RadioButton";
import ShowChoiceButton from "../../components/Fridge/ShowChoiceButton";

import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import FloatingActionButton from "../../layout/FloatingActionButton";
import SmallList from "../../components/Fridge/Category/SmallList";
import RefLargeList from "../../components/Fridge/Category/RefLargeList";
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
  let cl1Datas;
  const [cnt, setCnt] = useState(0);
  const [mainCatName, setMainCatName] = useState("");
  const [customSmallList, setCustomSmallList] = useState();
  const [refLargeList, setRefLargeList] = useState();
  const [selectIng, setSelectIng] = useState([]);

  if (props.location.state == undefined) {
    catName = "전체";
  }
  useEffect(async () => {
    catName = props.location.state == undefined ? "전체" : props.location.state.catName;
    setMainCatName(catName);
    if (catName == "전체" || catName == undefined) {
      setMainCatName(props.location.state.catName);
      cl1Datas = await getCl2Data(`${server.ip}/fridge/classification1`);
      setRefLargeList(<RefLargeList datas={cl1Datas} mainCheck={mainCheck.bind()} />);
    } else {
      cl2Datas = await getCl2Data(
        `${server.ip}/fridge/searchUserProduct?cl1ID=${props.location.state.catID}`
      );
      setCustomSmallList(
        <SmallList selectIng={tmp} cnt={cnt} addCnt={addCnt.bind()} datas={cl2Datas} />
      );
    }
  }, []);

  let tmp = [];
  // console.log(largeList);
  const addCnt = (re) => {
    console.log("frigde", re);
    tmp = re;
    setSelectIng(re);
  };

  const mainCheck = async (c1ID, classification1Name) => {
    catName = classification1Name;
    tmp = selectIng;
    setMainCatName(classification1Name);
    const datas = await getCl2Data(`${server.ip}/fridge/searchUserProduct?cl1ID=${c1ID}`);
    setCustomSmallList(
      <SmallList selectIng={selectIng} cnt={cnt} addCnt={addCnt.bind()} datas={datas} />
    );
  };

  const getRefDt = async () => {
    cl1Datas = await getCl2Data(`${server.ip}/fridge/classification1`);
    tmp = selectIng;
    setRefLargeList(<RefLargeList datas={cl1Datas} mainCheck={mainCheck.bind()} />);
  };

  const goBack = (re) => {
    setMainCatName(re);
    getRefDt();
  };
  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">나의 냉장고</Typography>
        <Divider />
        <Box justifyContent="space-between" alignItems="center">
          <Breadcrumb catName={mainCatName} goBack={goBack.bind()} />
          <ShowChoiceButton selectIng={selectIng} />
        </Box>
        <RadioButton />
        {mainCatName == "전체" ? refLargeList : customSmallList}
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
};

export default Fridge;
