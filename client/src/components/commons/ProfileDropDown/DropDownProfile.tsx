import styles from './DropDownProfile.module.scss';
import { useContext, useEffect, useState } from 'react';
import DropDownProfileItem from './DropDownProfileItem';
import { Context } from '../../../main';
import CircleProfileSVG from '../../../../public/bx-user-circle.svg';
import UserSVG from '../../../../public/bx-user.svg';
import TimeSVG from '../../../../public/bx-time.svg';
import WalletSVG from '../../../../public/bx-wallet.svg';
import LogOutSVG from '../../../../public/bx-log-out.svg';
import { observer } from 'mobx-react-lite';

function DropDownProfile(): JSX.Element {
  const { store } = useContext(Context);

  const options = [
    {
      value: store.isAuth ? store.user.email : 'Имя пользователя',
      icon: UserSVG,
      route: '/customer-account/settings',
    },
    {
      value: 'История',
      icon: TimeSVG,
      route: '/customer-account/history',
    },
    {
      value: 'Кошелек',
      icon: WalletSVG,
      route: '/customer-account/wallet',
    },
    { value: 'Выйти', icon: LogOutSVG, route: '' },
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
      {store.user.email!=='admin@admin'&&<div className={hiddenDropDown ? styles.dropDown : styles.dropDownClick}>
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
          <img src={CircleProfileSVG} alt="bx-user-circle"/>
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
                  ? () => {
                      
                      store.logout();
                      
                      
                    }
                  : undefined
              }
            />
          ))}
        </div>
      </div>}
      
    </>
  );
}

export default observer(DropDownProfile);
