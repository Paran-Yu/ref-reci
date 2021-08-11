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



export default function QRCode() {
  return (
    <Container fixed>
      <h1>
        여기에 QRCode를 넣어주세요
      </h1>
    </Container>
  )
}