import {useState, React} from 'react';
// import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";

// Style
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// Core
import createTheme from '@material-ui/core/styles/createTheme';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

// Server 
import axios from 'axios';
import server from '../../../../server.json';

// const option ={
//   url:'http://i5a203.p.ssafy.io',
//   method:'POST',
//   header:{
    
//   }
// }

// axios(option)

// if chosen_items:
const params = {
  'size':'150x150',
  'data':'1'     // 여기에 userid
}
// qr_code = requests.get(
//     'http://api.qrserver.com/v1/create-qr-code', params=params
// ).url
const userid = '1'
const size = 250

export default function QRCode(props) {
  return (
    <Container fixed>
      <div>
        <Typography
        variant="h4">
          나의 QR 코드
        </Typography>
      </div>
      <Box p={2}>
        <img width={size} height={size} src={'http://api.qrserver.com/v1/create-qr-code?size='+size+'x'+size+'&data=' + props.uID} ></img>
      </Box>
    </Container>
  )
}