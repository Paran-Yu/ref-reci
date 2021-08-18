import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
// Layout
import TopBar from '../../layout/TopBar';
import BottomBar from '../../layout/BottomBar';
import FloatingActionButton from '../../layout/FloatingActionButton';

import axios from 'axios';
import Dates from '../../components/Calendar/Dates';
import FoodList from '../../components/Calendar/FoodList';
import server from '../../server.json'
import { computeSegDraggable } from '@fullcalendar/react';

const getItems = async (url,date) => {
  try {    
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

const get7Items = async (url) => {
  try {    
    const data = await axios({
      method: 'GET',
      url: url,
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

const getAllItems = async (url) => {
  try {    
    const data = await axios({
      method: 'GET',
      url: url,
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

  const get7Days = (async () => {
    const foodlist = await get7Items(`${server.ip}/foodlist/get7days`)
    console.log(foodlist)
    const foodItems = foodlist.map((foodData) => {
      // console.log(`${foodData.Name}.jpg`)
      return (
        <FoodList foodName={foodData.Name} foodDday={foodData.Dday} foodCount={foodData.Count} url={`${server.ip}/img?id=${foodData.Img}`}/>
      )
    })
    setfoodDatas(foodItems)
  })
  const getAll = (async () => {
    const foodlist = await getAllItems(`${server.ip}/foodlist/getAllItem`)
    console.log(foodlist)
    const foodItems = foodlist.map((foodData) => {
      // console.log(`${foodData.Name}.jpg`)
      return (
        <FoodList foodName={foodData.Name} foodDday={foodData.Dday} foodCount={foodData.Count} url={`${server.ip}/img?id=${foodData.Img}`}/>
      )
    })
    setfoodDatas(foodItems)
  })

  //받아온 dates에 배열을 생성, events 는 이벤트가 있는 전체 날짜 calender events
  function getDates(dates, events) {
    let flag = 0
    for(let i = 0 ; i < events.length ; i++){
      if(Date(events[i]).toString() != Date(dates).toString()){
        console.log(Date(events[i]), Date(dates))
      }
      else{
        console.log(Date(events[i]), Date(dates))
        flag = 1
        break
      }
    }
    if(flag == 1){
      console.log('이벤트 있음')

      setDates(dates)
    }
    else {
      console.log('이벤트 없음')

    }
    // setfoodDatas(<FoodList/>)
  }
  
  useEffect(async () => {
    console.log("dates", dates)
    const foodlist = await getItems(`${server.ip}/foodlist/getItems`, `${dates}`);
    console.log("foodlist", foodlist)
    //다른거에 담아서 여러개를 보내는?
    // const foodlist = await getItems(`${server.ip}/foodlist/getItems`, `${dates}`);

    const foodItems = foodlist.map((foodData) => {
      // console.log(`${foodData.Name}.jpg`)
      return (
        <FoodList foodName={foodData.Name} foodDday={foodData.Dday} foodCount={foodData.Count} url={`${server.ip}/img?id=${foodData.Img}`}/>
      )
    })
    console.log("foodItems", foodItems)
    setfoodDatas(foodItems);
  }, [dates])

  return (
    <Container fixed>
      <TopBar />
      <Box my={5}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box p={3}>
                <Dates onChildClick={getDates} on7DayClick={get7Days} onAllClick={getAll}/>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box p={3}>
                {foodDatas}
              </Box>
            </Grid>
          </Grid>
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  )
}