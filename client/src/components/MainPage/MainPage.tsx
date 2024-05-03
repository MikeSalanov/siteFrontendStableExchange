import CurrencyTicker from '../CurrencyTicker/CurrencyTicker';
import FormExchange from '../FormExchange/FormExchange';
import Header from '../Header/Header';
function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <CurrencyTicker />
      <FormExchange />
    </>
  );
}

export default MainPage;
