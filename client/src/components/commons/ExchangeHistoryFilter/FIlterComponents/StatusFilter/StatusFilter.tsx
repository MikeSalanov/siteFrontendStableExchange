import { FilterObj } from "../../ExchangeHistoryFilter";


type StatusFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
  status:  FilterObj["status"] | undefined;
};

function StatusFilter({ setFilter, status }: StatusFilterProps) {



  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const update = event.target.value;
    setFilter((prevFilter) => ({ ...prevFilter, status: update }));
  };

  return (
    <div>
      <select defaultValue="Status" onChange={handleStatusChange} value={status || 'Status'}>
        <option disabled hidden>
          Status
        </option>
        <option value="transfering">Transfering</option>
        <option value="payouting">Payouting</option>
        <option value="finished">Finished</option>
      </select>
    </div>
  );
}

export default StatusFilter;
