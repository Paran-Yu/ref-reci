import React, {useState} from 'react';

import Typography  from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createTheme';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

import axios from 'axios';
import server from '../../../server.json';



export default function CheckPassword() {
  const [password, setPassword] = useState('');

  const onChangePW = (event) => {
    setPassword(event.target.value);
  }
  
  return (
    <box>
      <div>
        회원정보를 수정하시려면 비밀번호를 입력하세요.
      </div>
      <form>
        <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="비밀번호"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={onChangePW}
        />
        <Button
        fullWidth
        size="large"
        variant="contained"
        color= "primary"
        >
          확인
        </Button>
      </form>
    </box>
  )
}