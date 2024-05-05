import CurrencyTicker from '../CurrencyTicker/CurrencyTicker';
import Footer from '../Footer/Footer';
import FormExchange from '../FormExchange/FormExchange';
import Header from '../Header/Header';
import MainDescription from '../MainDescription/MainDescription';
function MainPage(): JSX.Element {
  return (
    <>
      <Header />
      <CurrencyTicker />
      <FormExchange />
      <MainDescription/>
      <Footer/>
    </>
  );
}

export default MainPage;
