import React, { useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import events from './events'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';
import './index.css'

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
          dateClick={(info) => {alert(info.dateStr)}}
          eventClick={(el) => {alert(el.event.startstr)}}

        />
      </section>
    )
  }
