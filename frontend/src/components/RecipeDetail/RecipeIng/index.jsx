import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    flexShrink: 0,
    maxWidth: '100%',
  },
});

function createData(name, quantity) {
  return { name, quantity };
};

const ingRows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
  createData('Cupcake', 305),
  createData('Gingerbread', 356),
];

// [박지우 -> 이지훈] 여기에 재료를 위 rows의 형태로 담아주세요. 튜플말고 {name: 'Frozen yogurt', 'quantity: 159} 이렇게 하셔도 됩니다.
// const ingRows = await getUserData(`${server.ip}/...`);


const ingCells = ingRows.map((ing) => {
  return (
  <TableRow key={ing.name}>
    <TableCell component="th" scope="row">{ing.name}</TableCell>
    <TableCell align="right">{ing.quantity}</TableCell>
  </TableRow>
  )
})


export default function RecipeIng() {
  const classes = useStyles();

  return (
    <Box p={5}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="ingredient table">
          <TableHead>
            <TableRow>
              <TableCell>재료</TableCell>
              <TableCell align="right">양</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingCells}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    
  )
}