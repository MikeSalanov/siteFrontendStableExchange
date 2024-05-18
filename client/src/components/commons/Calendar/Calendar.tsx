import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import styles from "./Calendar.module.scss"


function Calendar() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={(update: [Date | null, Date | null]) => {
        setDateRange(update);
      }}
      isClearable={true}
      locale={ru}
      className={styles.datePickerInput}
      closeIconClassName ={styles.closeIcon}
    />

  );
}

export default Calendar;