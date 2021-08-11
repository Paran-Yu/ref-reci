import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import events from './events'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import server from '../../../server.json';
import './index.css'

const getEvents = async (url, date) => {
  try {
      const data = await axios({
          method: 'post',
          url: url,
          data: {
              date:date
          },
          headers: {
              accept: 'application/json',
          },
      });
      return data.data;
  }
  catch (err) {
      console.log(url);
      console.log(`ERROR: ${err}`);
  }
}
// componentDidMount() {
//   fetch('http://localhost:3001/mypage')
//       .then(res=>res.json())
//       .then(data=>console.log(data));
// }

//백에서 달 꺼를 날짜를 가져와서 캘린더에 뿌리고
//캘린더 클릭 시 백에서 해당 날짜에 유통기한마감 상품을 다른 창에 뿌림

export default function(){
  const calendarRef = useRef(null)

  // const onEvent = event => {
  //   let calendaApi = this.calendarRef.current.getApi();
  //   calendaApi.next()
  // }

    return(
      <section>

        <FullCalendar
          ref={calendarRef}
          plugins={[ dayGridPlugin, interactionPlugin ]}
          initialView="dayGridMonth"
          events={events}
          locale={'ko'}
          dateClick={async (info) => {
            alert(info.dateStr)
            
            const data = await getEvents(`${server.ip}/calendar/getMonth`, info.dateStr)
            console.log(data)
          }}
          eventClick={(el) => {alert(el.event.startstr)}}

        />
      </section>
    )
  }
