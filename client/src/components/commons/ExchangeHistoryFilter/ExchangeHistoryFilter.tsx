import { useEffect, useState } from "react";
import "./ExchangeHistoryFilter.module.scss";
import Calendar from "./FIlterComponents/Calendar/Calendar";
import styles from "./ExchangeHistoryFilter.module.scss";
import StatusFilter from "./FIlterComponents/StatusFilter/StatusFilter";
import { $apiExchanges } from "../../../services/ExchangesService";


export type DateRange = {
  dateFrom: null | Date,
  dateTo: null | Date
}


export type FilterObj = {
  dateRange?: DateRange;
  status?: string;
  publicId?: string;
  currencyFrom?: string;
  currencyTo?: string;
};

function ExchangeHistoryFilter() {
  const [toggleCalendar, setToggleCalendar] = useState<boolean>(false);




const [filter, setFilter] = useState<FilterObj>({})
  console.log(filter);
  
useEffect(() => {
  const {dateRange, ...filters} = filter

  const formattedDateFrom = dateRange?.dateFrom?.toISOString()
  const formattedDateTo = dateRange?.dateTo?.toISOString()
  
  dateRange
  $apiExchanges.get('/exchanges', {
    params: {...filters, dateFrom: formattedDateFrom, dateTo: formattedDateTo}
  })
  .then(response => {
    console.log('Server response:', response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}, [filter])


  return (
    <div>
      <div className={styles.filterContainer}>
        <div className={styles.filterOptionsContainer}>
          <div className={styles.calendar_and_status_filterContainer}>
            <div>
              <button onClick={() => setToggleCalendar(!toggleCalendar)}>
                <img src="../../public/calendar.svg" alt="calendar-icon" />
              </button>
            </div>
            {toggleCalendar && <Calendar setFilter={setFilter} dateRange={filter.dateRange}/>}
         <StatusFilter setFilter={setFilter} status={filter.status}/>
          </div>
          <div className={styles.exchangeID_from_to_filterContainer}>
            <div>
              <input type="text" placeholder="ID" name="exchangeId" onChange={(e) => setFilter()} />
            </div>
            <div>
              <select defaultValue="From">
                <option disabled hidden>
                  From
                </option>
                <option value="sberRub">Sber rub</option>
                <option value="tinkRub">Tinkof rub</option>
                <option value="dol">Dollar</option>
                <option value="eur">Euro</option>
              </select>
            </div>
            <div>
              <select defaultValue="To">
                <option disabled hidden>
                  To
                </option>
                <option value="sberRub">Sber rub</option>
                <option value="tinkRub">Tinkof rub</option>
                <option value="dol">Dollar</option>
                <option value="eur">Euro</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.divClearBtn}>
          <button className={styles.clearBtn}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default ExchangeHistoryFilter;
