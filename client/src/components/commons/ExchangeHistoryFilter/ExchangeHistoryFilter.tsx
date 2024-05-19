import { useState } from "react";
import "./ExchangeHistoryFilter.module.scss";
import Calendar from "../Calendar/Calendar";
import styles from "./ExchangeHistoryFilter.module.scss";

function ExchangeHistoryFilter() {
  const [toggleCalendar, setToggleCalendar] = useState<boolean>(false);
  

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
            {toggleCalendar && <Calendar />}
            <div>
              <select defaultValue="Status">
                <option disabled hidden>
                  Status
                </option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className={styles.exchangeID_from_to_filterContainer}>
            <div>
              <input type="text" placeholder="ID" name="exchangeId" />
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
