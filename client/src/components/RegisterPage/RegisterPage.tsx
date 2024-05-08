
import { useState } from 'react';
import Header from '../Header/Header';
import MailAdvPopUp from '../commons/MailAdvPopUp/MailAdvPopUp';
import RegistrationForm from '../commons/RegistrationForm/RegistrationForm';
import styles from './RegisterPage.module.scss'
function RegisterPage(): JSX.Element {
  const [modalActive, setModalActive] = useState(false)

  return (
    <>
      <Header/>
      {/* <div className={styles.wrapperRegisterPage}>Register Page</div> */}
      <RegistrationForm active ={modalActive} setModalActive={setModalActive} />
      <MailAdvPopUp active ={modalActive} setModalActive={setModalActive}/>
    </>
  );
}

export default RegisterPage;
