import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import server from '../../../server.json';
import './index.css'


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

const getItems = async (url, date) => {
  try {
    const data = await axios({
      method: 'post',
      url: url,
      data : {
        date : date
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




//백에서 달 꺼를 날짜를 가져와서 캘린더에 뿌리고
//캘린더 클릭 시 백에서 해당 날짜에 유통기한마감 상품을 다른 창에 뿌림

export default function Dates() {
  const calendarRef = useRef(null)
  const [calendarData, setCalendarData]=useState([])
  const items = getItems('http://localhost:3001/foodlist/getItems',"2021-08-17")
  console.log(items)
  useEffect(async()=>{
    const data= await getEvents('http://localhost:3001/calendar/getEvents')
    setCalendarData(data)
  },[])
  
  // console.log('캘린더')
  // console.log(typeof(calendarData), calendarData)
    return(
      <section>
        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          events={calendarData}
          locale={'ko'}
          dateClick={async (info) => {
            alert(info.dateStr)
          }}
          //foodlist로 날짜 전달
          //달력에 선택된게 아무것도 없을 때
          //리스트에 유효기간이 임박한 순으로 보여주기
          eventClick={(el) => {alert(el.event.startstr)}}
        />
      </section>
    )
  }