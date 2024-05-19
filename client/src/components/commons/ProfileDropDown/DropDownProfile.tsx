import styles from './DropDownProfile.module.scss';
import { useContext, useEffect, useState } from 'react';
import DropDownProfileItem from './DropDownProfileItem';
import { Context } from '../../../main';

function DropDownProfile(): JSX.Element {
  const { store } = useContext(Context);

  const options = [
    {
      value: store.isAuth ? store.user.email : 'Имя пользователя',
      icon: 'bx-user.svg',
      route: '/customer-account/settings',
    },
    {
      value: 'История',
      icon: 'bx-time.svg',
      route: '/customer-account/history',
    },
    {
      value: 'Кошелек',
      icon: 'public/bx-wallet.svg',
      route: '/customer-account/wallet',
    },
    { value: 'Выйти', icon: 'bx-log-out.svg', route: '' },
  ];
  const [hiddenDropDown, setHiddenDropDown] = useState<boolean>(true);

  const clickOutside = (e: Event) => {
    if ((e.target as Element).id !== 'header-item') {
      setHiddenDropDown(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  return (
    <>
      <div className={hiddenDropDown ? styles.dropDown : styles.dropDownClick}>
        <div
          className={
            hiddenDropDown ? styles.headerItem : styles.headerItemClick
          }
          id="header-item"
          onClick={(e) => {
            e.stopPropagation();
            setHiddenDropDown((prev) => !prev);
          }}
        >
          <img src="bx-user-circle.svg" alt="bx-user-circle" />
          <p>Профиль</p>{' '}
        </div>
        <div
          className={hiddenDropDown ? styles.hiddenMenu : styles.dropDownMenu}
        >
          {options.map((option) => (
            <DropDownProfileItem
              value={option.value}
              icon={option.icon}
              route={option.route}
              onClick={
                option.value === 'Выйти'
                  ? (e) => {
                      e.stopPropagation();
                      store.logout();
                      
                      
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DropDownProfile;
