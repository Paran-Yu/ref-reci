import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Dates from '../../components/Calendar/Dates';
import FoodList from '../../components/Calendar/FoodList';

export default function Calendar() {
  return (
    <Box my={2}>
      <Container fixed>
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
      </Container>
    </Box>
  )
}