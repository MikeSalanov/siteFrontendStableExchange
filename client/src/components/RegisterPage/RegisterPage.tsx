import { useState } from 'react';
import MailAdvPopUp from '../commons/MailAdvPopUp/MailAdvPopUp';
import RegistrationForm from '../commons/RegistrationForm/RegistrationForm';

function RegisterPage(): JSX.Element {
  const [modalActive, setModalActive] = useState<boolean>(false)

  return (
    <>
      <RegistrationForm setModalActive={setModalActive} />
      <MailAdvPopUp active={modalActive} setModalActive={setModalActive}/>
    </>
  );
}

export default RegisterPage;
