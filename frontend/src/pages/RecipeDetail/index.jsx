import React, { useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import TopBar from '../../layout/TopBar';
import BottomBar from '../../layout/BottomBar';
import FloatingActionButton from '../../layout/FloatingActionButton';
import RecipeTitle from '../../components/RecipeDetail/RecipeTitle';
import RecipeContent from '../../components/RecipeDetail/RecipeContent';

// Server
import axios from 'axios';
import server from '../../server.json';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  image: {
    maxWidth: '100%',
    height: '100%',
  },
}));

const getRecipe = async (url) => {
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

export default function RecipeDetail({match}) {
  const classes = useStyles();
  let rID;


  useEffect(() => {
    rID = match.params.rid;
    const datas = getRecipe(`${server.ip}/recipe/`)
  }, [])

  return (
    <Container fixed>
      <TopBar />
      <RecipeTitle />
      <RecipeContent />
      <BottomBar />
      <FloatingActionButton />
    </Container>
  )
};