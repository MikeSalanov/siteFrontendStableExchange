import { useContext, useEffect, useState } from "react";
import "./ExchangeHistoryFilter.module.scss";
import Calendar from "./FIlterComponents/Calendar/Calendar";
import styles from "./ExchangeHistoryFilter.module.scss";
import StatusFilter from "./FIlterComponents/StatusFilter/StatusFilter";
import { $apiExchanges } from "../../../services/ExchangesService";
import CurrencyFromFilter from "./FIlterComponents/CurrencyFromFilter/CurrencyFromFilter";
import CurrencyToFilter from "./FIlterComponents/CurrencyToFilter/CurrencyToFilter";
import { format } from "date-fns";
import { Context } from "../../../main";


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


const {exchanges} = useContext(Context)

const [filter, setFilter] = useState<FilterObj>({})

  console.log(filter);


const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value;
    setFilter((prevFilter) => ({ ...prevFilter, publicId : id}));
}
  
// const handleClearChange = () => {
//   setFilter({
//     dateRange: undefined,
//     status: "Status",
//     publicId: "",
//     currencyFrom: "From",
//     currencyTo: "To",
//   });
//   setToggleCalendar(false);
// };


useEffect(() => {
  const {dateRange, ...filters} = filter

  const formattedDateFrom = dateRange?.dateFrom ? format(dateRange.dateFrom, "yyyy-MM-dd'T'HH:mm:ssXXX") : undefined;
  const formattedDateTo = dateRange?.dateTo ? format(dateRange.dateTo, "yyyy-MM-dd'T'HH:mm:ssXXX") : undefined;

  console.log(formattedDateFrom, formattedDateTo);
  
  
  // dateRange
  exchanges.getExchanges({
    ...filters,
    dateFrom: formattedDateFrom,
    dateTo: formattedDateTo
  })
  .then(response => {
    console.log('Server response:', response?.data);
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
              <input type="text" placeholder="ID" name="exchangeId" onChange={handleInputChange} />
            </div>
            <CurrencyFromFilter setFilter={setFilter}/>
            <CurrencyToFilter setFilter={setFilter}/>
          </div>
        </div>
        <div className={styles.divClearBtn}>
          <button className={styles.clearBtn} onClick={() => setFilter({})}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default ExchangeHistoryFilter;
