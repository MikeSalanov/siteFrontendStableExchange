import { FilterObj } from "../../ExchangeHistoryFilter";

type CurrencyFromFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
  currencyFrom: FilterObj["currencyFrom"]
}


function CurrencyFromFilter({setFilter, currencyFrom} : CurrencyFromFilterProps) {

const handleCurrencyFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const update = event.target.value;
  setFilter((prevFilter) => ({ ...prevFilter, currencyFrom: update }));
}




  return (  
    <div>
    <select defaultValue="From" onChange={handleCurrencyFrom} value={currencyFrom}>
      <option disabled hidden>
        From
      </option>
      <option value="sberRub">Sber rub</option>
      <option value="tinkRub">Tinkof rub</option>
      <option value="dol">Dollar</option>
      <option value="eur">Euro</option>
    </select>
  </div>
    
  );
}
 
export default CurrencyFromFilter;