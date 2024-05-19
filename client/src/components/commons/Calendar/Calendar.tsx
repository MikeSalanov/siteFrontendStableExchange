import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";
import styles from "./Calendar.module.scss"


function Calendar() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update);
    const [dateFrom, dateTill] = update;

    if (dateFrom && dateTill) {
      const formattedDateFrom = dateFrom.toISOString().split('T')[0];
      const formattedDateTill = dateTill.toISOString().split('T')[0];

      axios.get('http://your-server-endpoint', {
        params: {
          dateFrom: formattedDateFrom,
          dateTill: formattedDateTill,
        },
      })
      .then(response => {
        console.log('Server response:', response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }
  };



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