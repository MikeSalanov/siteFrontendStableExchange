import { FilterObj } from "../../ExchangeHistoryFilter";

type CurrencyFromFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
}


function CurrencyFromFilter({setFilter} : CurrencyFromFilterProps) {

const handleCurrencyFrom = (event: React.ChangeEvent<HTMLSelectElement>) => {
  const update = event.target.value;
  setFilter((prevFilter) => ({ ...prevFilter, currencyFrom: update }));
}




  return (  
    <div>
    <select defaultValue="From" onChange={handleCurrencyFrom}>
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