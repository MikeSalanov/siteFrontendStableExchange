import styles from './DropDownProfile.module.scss';
import { useContext, useEffect, useState } from 'react';
import DropDownProfileItem from './DropDownProfileItem';
import { Context } from '../../../main';

function DropDownProfile(props: {
  setDropdownVisiable: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { store } = useContext(Context);
  const { setDropdownVisiable } = props;
  const options = [
    {
      value: store.isAuth ? store.user.email : 'Имя пользователя',
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
              onClick={
                option.value === 'Выйти'
                  ? () => {
                      store.logout();
                      setDropdownVisiable(false);
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
