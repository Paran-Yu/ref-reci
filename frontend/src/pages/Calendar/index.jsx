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
import Pagination from '@material-ui/lab/Pagination';

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

  const [posts, setPosts]   = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const get7Days = (async () => {
    const foodlist = await get7Items(`${server.ip}/foodlist/get7days`)
    console.log(foodlist)
    setPosts(foodlist);
  })
  const getAll = (async () => {
    const foodlist = await getAllItems(`${server.ip}/foodlist/getAllItem`)
    console.log(foodlist)
    setPosts(foodlist);
  })

  //받아온 dates에 배열을 생성
  function getDates(dates) {
    setDates(dates)
  }
  
  useEffect(async () => {
    //console.log(dates)
    const foodlist = await getItems(`${server.ip}/foodlist/getItems`, `${dates}`);
    //다른거에 담아서 여러개를 보내는?
    // const foodlist = await getItems(`${server.ip}/foodlist/getItems`, `${dates}`);
    setPosts(foodlist);

  }, [dates])

  // 현재 페이지 가져오기
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = (event, value) => {
    setCurrentPage(value)
  };

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
              <Box p={1}>
                {currentPosts.map((foodData) => {
                return (
                  <FoodList foodName={foodData.Name} foodDday={foodData.Dday} foodCount={foodData.Count} url={`${server.ip}/img?id=${foodData.Img}`}/>
                )
              })}
              <Pagination onChange={paginate} 
              page={currentPage} 
              count={Math.ceil(posts.length/postPerPage)} 
              color="primary" />
              </Box>
            </Grid>
          </Grid>
      </Box>
      <FloatingActionButton />
      <BottomBar />
    </Container>
  )
}