import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// Layout
import TopBar from '../../layout/TopBar';
import BottomBar from '../../layout/BottomBar';
import FloatingActionButton from '../../layout/FloatingActionButton';

import Dates from '../../components/Calendar/Dates';
import FoodList from '../../components/Calendar/FoodList';

export default function Calendar() {
  return (
    <Container fixed>
      <TopBar />
      <Box my={2}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box p={1}>
                <Dates />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box p={1}>
                <FoodList />
              </Box>
            </Grid>
          </Grid>
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
    
  )
}