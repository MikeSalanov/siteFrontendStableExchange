import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { useContext, useState } from 'react';
import DropDownProfile from '../commons/ProfileDropDown/DropDownProfile';
import { Context } from '../../main';

function Header(): JSX.Element {
  const { store } = useContext(Context);
  const [dropdownVisiable, setDropdownVisiable] = useState<boolean>(
    store.isAuth
  );
  useEffect(() => {
    console.log(store.isAuth);
  }, []);

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
        {dropdownVisiable ? (
          <DropDownProfile setDropdownVisiable={setDropdownVisiable} />
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
