import React, { useRef, useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import server from '../../../server.json';
import './index.css'
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';

// Theme & Style
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
}));


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

export default function Dates({onChildClick, on7DayClick, onAllClick}) {
  const calendarRef = useRef(null)
  const [calendarData, setCalendarData]=useState([])
  const classes = useStyles();

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
  
  const [showExpire, setShowExpire] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const handleAllChange = () => {
    onAllClick()
    setShowAll(!showAll)
    setShowExpire(false)
  }

  const handleExpireChange = () => {
    on7DayClick()
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
          eventClick={onEventClick}
          className="calendar"
          >
        </FullCalendar>
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