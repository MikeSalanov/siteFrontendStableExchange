import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext } from 'react';
import DropDownProfile from '../commons/ProfileDropDown/DropDownProfile';
import { Context } from '../../main';

function Header(): JSX.Element {
  const { store } = useContext(Context);
  
  return (
    <div className={styles.wrapper}>
      <div className=" h-full">
        {' '}
        <Link to="/">
          <img
            src="../../../public/stablelogo.svg"
            alt="logo"
            className=" h-full"
          />
        </Link>
      </div>

      <div className={styles.buttonsBlock}>
        {' '}
        {store.isAuth ? (
          <DropDownProfile />
        ) : (
          <>
            <Link to="/customer-account/signUp">
              <div className={styles.buttonAccount}>Создать аккаунт</div>
            </Link>

            <Link to="/customer-account/signIn">
              <div className={styles.buttonAccount}> Войти</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
