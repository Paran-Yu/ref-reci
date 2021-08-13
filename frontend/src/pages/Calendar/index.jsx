import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Dates from '../../components/Calendar/Dates';
import FoodList from '../../components/Calendar/FoodList';
import server from '../../server.json'
import { computeSegDraggable } from '@fullcalendar/react';

const getItems = async (url,date) => {
  try {
    console.log(`send Data = ${date}`)
    
    const data = await axios({
      method: 'POST',
      url: url,
      data: {
        date: date,
      },
      headers: { 
        accept: 'application/json'
      }
    })
    return data.data
  }
  catch (err) {
    console.log(url);
    console.log(`ERROR: ${err}`);
  }
}
export default function Calendar() {

  const [dates, setDates] = useState('')
  const [foodDatas, setfoodDatas] = useState();


  function getDates(dates) {
    // console.log(dates);
    setDates(dates)
  }
  console.log(dates)
  useEffect(async () => {
    //console.log(dates)
    const foodlist = await getItems(`http://localhost:3001/foodlist/getItems`, `${dates}`);



    const foodItems = foodlist.map((foodData) => {
      console.log(`${foodData.Name}.jpg`)
      return (
        <FoodList foodName={foodData.Name} foodDday={foodData.Dday} foodCount={foodData.Count} url={`${server.ip}/img?id=${foodData.Img}`}/>
      )
    })
    setfoodDatas(foodItems);
  }, [dates])
  

  return (

    <Box my={2}>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box p={1}>
              <Dates onChildClick={getDates}/>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box p={1}>
              {foodDatas}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}