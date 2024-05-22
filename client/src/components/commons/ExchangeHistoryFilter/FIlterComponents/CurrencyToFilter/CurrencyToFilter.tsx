
import { FilterObj } from "../../ExchangeHistoryFilter";

type CurrencyToFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
}


function CurrencyToFilter({setFilter}: CurrencyToFilterProps) {

  const handleCurrencyTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const update = event.target.value;
    setFilter((prevFilter) => ({ ...prevFilter, currencyTo: update }));
  }
  
  
  
  
    return (  
      <div>
      <select defaultValue="To" onChange={handleCurrencyTo}>
        <option disabled hidden>
          To
        </option>
        <option value="sberRub">Sber rub</option>
        <option value="tinkRub">Tinkof rub</option>
        <option value="dol">Dollar</option>
        <option value="eur">Euro</option>
      </select>
    </div>
      
    );
  }
   

export default CurrencyToFilter;