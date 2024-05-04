import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { useState } from 'react';
import DropDownProfile from '../commons/ProfileDropDown/DropDownProfile';
function Header(): JSX.Element {
  const [isAuth, setIsAuth] = useState<boolean>(false);

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
        {isAuth ? (
          <DropDownProfile/>
        ) : (
          <>
            <Link to="/customer-account/signUp">
              <div className={styles.buttonAccount}>Создать аккаунт</div>
            </Link>

            <Link
              to="/customer-account/signIn"
              onClick={() => {
                setIsAuth(true);
              }}
            >
              <div className={styles.buttonAccount}> Войти</div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
