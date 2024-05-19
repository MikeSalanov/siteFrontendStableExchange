import FormExchange from '../FormExchange/FormExchange';
import MainDescription from '../MainDescription/MainDescription';
function MainPage(): JSX.Element {
  return (
    <div className="items-center flex-auto flex flex-col justify-center gap-y-40">
      {' '}
      <FormExchange />
      <MainDescription />
    </div>
  );
}

export default MainPage;
