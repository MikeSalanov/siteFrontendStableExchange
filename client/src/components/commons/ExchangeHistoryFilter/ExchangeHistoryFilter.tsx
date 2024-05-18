import { useState } from 'react';
import './ExchangeHistoryFilter.module.scss'
import Calendar from '../Calendar/Calendar';
 


function ExchangeHistoryFilter() {

const [calendarActive, setCalendarActive] = useState<boolean>(false)



  return ( 
<div>
  <div>
    
      <div>
      <button onClick={() => setCalendarActive(!calendarActive)}><img src="../../public/calendar.svg" alt="calendar-icon" /></button>
      </div>
      {
        calendarActive && <Calendar/>
      }
   
  </div> 


</div>


   );
}
 
export default ExchangeHistoryFilter;