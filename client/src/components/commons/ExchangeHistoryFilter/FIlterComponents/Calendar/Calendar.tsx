import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import styles from "./Calendar.module.scss"
import { $apiExchanges } from "../../../../../services/ExchangesService";
import {FilterObj } from "../../ExchangeHistoryFilter";


type CalendarProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
  dateRange: FilterObj["dateRange"]
};



function Calendar({setFilter, dateRange} : CalendarProps) {
const {dateFrom, dateTo} = dateRange || {}
   

  const handleDateChange = (update: [Date | null, Date | null]) => {
    
    const [startDate, endDate] = update;

     setFilter((prevFilter) => ({...prevFilter, dateRange: {dateFrom : startDate, dateTo: endDate}}));
  
  };





  return (
    <DatePicker
      selectsRange={true}
      startDate={dateFrom}
      endDate={dateTo}
      onChange={handleDateChange}
      isClearable={true}
      locale={ru}
      className={styles.datePickerInput}
    />

  );
}

export default Calendar;