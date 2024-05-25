
import { FilterObj } from "../../ExchangeHistoryFilter";

type CurrencyToFilterProps = {
  setFilter: React.Dispatch<React.SetStateAction<FilterObj>>;
  currencyTo: FilterObj['currencyTo'] | undefined;
}


function CurrencyToFilter({setFilter, currencyTo}: CurrencyToFilterProps) {

  const handleCurrencyTo = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const update = event.target.value;
    setFilter((prevFilter) => ({ ...prevFilter, currencyTo: update }));
  }
  
  
  
  
    return (
      <div>
      <select defaultValue="To" onChange={handleCurrencyTo} value={currencyTo || 'To'}>
        <option disabled hidden>
          To
        </option>
        <option value="sbrub">sbrub</option>
        <option value="tscrub">tscrub</option>
        <option value="usd">usd</option>
      </select>
    </div>
    
    );
  }
  

export default CurrencyToFilter;
