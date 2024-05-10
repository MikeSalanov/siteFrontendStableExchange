
import Header from '../Header/Header';
import RegistrationForm from '../commons/RegistrationForm/RegistrationForm';

function RegisterPage(): JSX.Element {
  return (
    <>
      <Header/>
      {/* <div className={styles.wrapperRegisterPage}>Register Page</div> */}
      <RegistrationForm />
    </>
  );
}

export default RegisterPage;
