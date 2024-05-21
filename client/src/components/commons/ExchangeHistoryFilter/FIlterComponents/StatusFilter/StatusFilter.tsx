import { useState } from "react";
import styles from "./StatusFilter.module.scss";

type DateRange = [Date | null, Date | null];

type FilterObj = {
  dateRange: DateRange;
  status: string;
  publicId: string;
  currencyFrom: string;
  currencyTo: string;
};

type StatusFilterProps = {
  setFilter: (filter: (prevFilter: FilterObj) => FilterObj) => void;
  status: string;
};

function StatusFilter({ setFilter, status }: StatusFilterProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const update = event.target.value;
    setFilter((prevFilter: FilterObj) => ({ ...prevFilter, status: update }));

    
  };

  return (
    <div>
      <select defaultValue="Status" onChange={handleChange}>
        <option disabled hidden>
          Status
        </option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}

export default StatusFilter;
