import { useState, React } from "react";
import { Link } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { Divider, makeStyles, Typography } from "@material-ui/core";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Breadcrumb from "../../components/Fridge/Breadcrumb";
import LargeList from "../../components/Fridge/Category/LargeList";
import SearchBar from "../../components/Fridge/SearchBar";
import RadioButton from "../../components/Fridge/RadioButton";
import ShowChoiceButton from "../../components/Fridge/ShowChoiceButton";

import TopBar from "../../layout/TopBar";
import BottomBar from "../../layout/BottomBar";
import FloatingActionButton from "../../layout/FloatingActionButton";
import CatItem from "../../components/Fridge/Category/CatItem";

export default function Fridge() {
  return (
    <Container fixed>
      <TopBar />
      <Box my={3}>
        <Typography variant="h2">나의 냉장고</Typography>
        <Divider />
        <Box justifyContent="space-between" alignItems="center">
          <Breadcrumb />
          <ShowChoiceButton />
        </Box>
        <RadioButton />
        <SearchBar />
        <CatItem />
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  );
}
