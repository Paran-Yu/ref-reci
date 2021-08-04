
import { useState, React } from 'react';
import { Route } from "react-router";
import { BrowserRouter as Router, Link as RouterLink } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import server from '../../server.json';
import Calendar from 'react-calendar';
import './index.css';

const styles = makeStyles((theme)=>{

    
})
class MyApp extends Component {
    state = {
      date: new Date(),
    }
    onChange = date => this.setState({ date })
    render() {
      return (
        <div>
          <Calendar
            onChange={this.onChange}
            value={this.state.date}
            selectRange={true}
          />
        </div>
      );
    }
  }
function MyApp() {

    const [date, setDate] = useState(new Date());
    const [date1, setDate1] = useState(new Date(2021, 7, 10))
    const locale = 'ko-KR'; 
    const  onViewChange  =  e  =>  {
		console.log(e)
	}
    
    const value = [new Date(2021, 7, 10), new Date(2021, 7, 15)]
    return (
        <div>
            <Calendar 
                calendarType={"US"}
                locale={locale}
                onChange={new Date(2021, 8, 10)}
                value={value}
                
                // value={date1}
                onViewChange={onViewChange}
            />
        </div>
    );
}
export default MyApp
//export default Mypage;
