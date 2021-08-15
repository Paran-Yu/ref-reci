import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import server from '../../../server.json';
import './index.css'
import Box from '@material-ui/core/Box';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';

//날짜를 하나 씩 add
const getEvents = async (url) => {
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


//백에서 달 꺼를 날짜를 가져와서 캘린더에 뿌리고
//캘린더 클릭 시 백에서 해당 날짜에 유통기한마감 상품을 다른 창에 뿌림

export default function Dates({onChildClick}) {
  const calendarRef = useRef(null)
  const [calendarData, setCalendarData]=useState([])
  useEffect(async()=>{
    const data= await getEvents(`${server.ip}/calendar/getEvents`)
    setCalendarData(data)
  },[])
  const onDateClick = (info) => {
    onChildClick(info.dateStr)
  }
  const onEventClick = (info) => {
    onChildClick(info.event.startStr)
  }
  // console.log('캘린더')
  // console.log(typeof(calendarData), calendarData)
  
  const [showExpire, setShowExpire] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleAllChange = () => {
    setShowAll(!showAll)
    setShowExpire(false)
  }

  const handleExpireChange = () => {
    setShowExpire(!showExpire)
    setShowAll(false)
  }

    return(
      <Box>
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          events={calendarData}
          locale={'ko'}
          dateClick={onDateClick}
          //foodlist로 날짜 전달
          //달력에 선택된게 아무것도 없을 때
          //리스트에 유효기간이 임박한 순으로 보여주기
          eventClick={onEventClick}
        />
        <Box my={1}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={showExpire} onChange={handleExpireChange} />}
              label="유통기한 7일 이하인 식재료 모두 보기"
            />
            <FormControlLabel
              control={<Checkbox checked={showAll} onChange={handleAllChange} />}
              label="전체 리스트 보기"
            />
          </FormGroup>
        </Box>
      </Box>
    )
  }