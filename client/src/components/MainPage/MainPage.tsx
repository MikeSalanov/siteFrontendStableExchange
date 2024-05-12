import Footer from '../Footer/Footer';
import FormExchange from '../FormExchange/FormExchange';
import Header from '../Header/Header';
import MainDescription from '../MainDescription/MainDescription';
function MainPage(): JSX.Element {
  return (
    <>
      <div className=" items-center  h-screen flex-auto flex flex-col justify-between">
        {' '}
        <Header />
        <FormExchange />
        <MainDescription />
      </div>

      <Footer />
    </>
  );
}

export default MainPage;
