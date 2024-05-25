import { FilterObj } from "../../ExchangeHistoryFilter";

type CurrencyFromFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
  currencyFrom: FilterObj["currencyFrom"] | undefined
}


function CurrencyFromFilter({setFilter, currencyFrom} : CurrencyFromFilterProps) {

const handleCurrencyFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const update = event.target.value;
  setFilter((prevFilter) => ({ ...prevFilter, currencyFrom: update }));
}




  return (
    <div>
    <select defaultValue="From" onChange={handleCurrencyFrom} value={currencyFrom || 'From'}>
      <option disabled hidden>
        From
      </option>
      <option value="sbrub">sbrub</option>
      <option value="tscrub">tscrub</option>
      <option value="usd">usd</option>
    </select>
  </div>
  
  );
}

export default CurrencyFromFilter;
