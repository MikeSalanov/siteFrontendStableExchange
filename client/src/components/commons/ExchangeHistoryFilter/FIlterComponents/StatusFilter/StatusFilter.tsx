import { useState } from "react";
import styles from "./StatusFilter.module.scss";
import { FilterObj } from "../../ExchangeHistoryFilter";


type StatusFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
  status:  FilterObj["status"];
};

function StatusFilter({ setFilter }: StatusFilterProps) {



  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const update = event.target.value;
    setFilter((prevFilter) => ({ ...prevFilter, status: update }));

    
  };

  return (
    <div>
      <select defaultValue="Status" onChange={handleStatusChange}>
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
