import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import RecipeStep from '../RecipeStep';
import RecipeIng from '../RecipeIng';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function RecipeContent(props) {

  return (
    <Box my={1}>
      <Paper>
        {/* <Typography variant="h5">
          재료
        </Typography> */}
        <Box m={2}>
          <RecipeIng datas={props.datas1}/>
        </Box>
      </Paper>
      <Paper>
        {/* <Typography variant="h5">
          순서
        </Typography> */}
        <Box>
          <RecipeStep datas={props.datas2}/>
        </Box>
      </Paper>
    </Box>
  )
  } 
