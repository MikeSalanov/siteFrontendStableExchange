
import { useState } from 'react';
import Header from '../Header/Header';
import MailAdvPopUp from '../commons/MailAdvPopUp/MailAdvPopUp';
import RegistrationForm from '../commons/RegistrationForm/RegistrationForm';

function RegisterPage(): JSX.Element {
  const [modalActive, setModalActive] = useState<boolean>(false)

  return (
    <>
      <Header/>
      {/* <div className={styles.wrapperRegisterPage}>Register Page</div> */}
      <RegistrationForm setModalActive={setModalActive} />
      <MailAdvPopUp active ={modalActive} setModalActive={setModalActive}/>
    </>
  );
}

export default RegisterPage;
