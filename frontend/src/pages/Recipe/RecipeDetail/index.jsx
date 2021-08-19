import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Paper, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import TopBar from '../../../layout/TopBar';
import BottomBar from '../../../layout/BottomBar';
import FloatingActionButton from '../../../layout/FloatingActionButton';
import RecipeTitle from '../../../components/RecipeDetail/RecipeTitle';
import RecipeContent from '../../../components/RecipeDetail/RecipeContent';

// server
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

const getDatas = async (url) => {
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

export default function RecipeDetail(props) {
  const classes = useStyles();

  const [star, setStar] = useState(false);

  useEffect(async () => {
    const loginData = await getDatas(`${server.ip}/user/isLogin`);
    if (loginData.value === undefined) {
      window.location.replace("http://i5a203.p.ssafy.io/signin")
    }
    
    console.log("HI");
    const rID = props.match.params.rid;

    const isFavor = await getDatas(`${server.ip}/recipe/addFavorRecipe?rID=${rID}`);
    console.log("isFavor", isFavor);
    if (isFavor){
      setStar(true)
    }
    else{
      setStar(false)
    }
  }, []);

  return (
    <Container fixed>
      <TopBar />
      <RecipeTitle isStar={star}/>
      <RecipeContent />
      <BottomBar />
      <FloatingActionButton />
    </Container>
  )
};