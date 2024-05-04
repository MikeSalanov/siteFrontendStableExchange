﻿import styles from './DropDownProfile.module.scss';
import { useEffect, useState } from 'react';
import DropDownProfileItem from './DropDownProfileItem';

function DropDown(): JSX.Element {
  const options = [
    {
      value: 'Имя пользователя',
      icon: '../../public/bx-user.svg',
      route: '/customer-account/settings',
    },
    {
      value: 'История',
      icon: '../../public/bx-time.svg',
      route: '/customer-account/history',
    },
    {
      value: 'Кошелек',
      icon: '../../public/bx-wallet.svg',
      route: '/customer-account/wallet',
    },
    { value: 'Выйти', icon: '../../public/bx-log-out.svg', route: '' },
  ];
  const [hiddenDropDown, setHiddenDropDown] = useState<boolean>(true);

  const clickOutside = (e) => {
    if (e.target.id !== 'header-item') {
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
          <img src="../../public/bx-user-circle.svg" alt="bx-user-circle" />
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
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default DropDown;