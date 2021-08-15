import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import RecipeStep from '../RecipeStep';
import RecipeIng from '../RecipeIng';
import { Typography } from '@material-ui/core';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories) {
  return { name, calories };
};

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];


export default function RecipeContent() {
  const classes = useStyles();

  return (
    <Box my={1}>
      <Paper>
        <Typography variant="h5">
          재료
        </Typography>
        <Box mx={2}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>재료</TableCell>
                  <TableCell align="right">양</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">{row.name}</TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <RecipeIng />
        </Box>
        <Typography variant="h5">
          순서
        </Typography>
        <Box>
          <RecipeStep />
        </Box>
      </Paper>
    </Box>
  )
  } 
