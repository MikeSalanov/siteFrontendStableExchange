import { useContext } from 'react';
import styles from './MailAdvPopUp.module.scss'
import { Context } from '../../../main';


function MailAdvPopUp ({active, setModalActive}): JSX.Element {

  const {store} = useContext(Context)


  return ( 
    <div className={active ? `${styles.modal} ${styles.modalActive}` : styles.modal} onClick={() => setModalActive(false)}>
      <div className={active ? `${styles.modalContent} ${styles.modalContentActive}` : styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src="../../public/mail.svg" alt="icon" />
        <p className={styles.contentTitle}>Проверьте указанную почту</p>
        <p className ={styles.contentDescription}>{`На адрес электронной почты ${store.user.email ? store.user.email : '' } направлена ссылка для подтверждения регистрации`} </p>      
      </div>
    </div>
   );
}
 
export default MailAdvPopUp;