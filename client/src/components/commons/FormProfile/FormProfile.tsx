import { useContext, useState } from 'react';
import { Context } from '../../../main';
import styles from './FormProfile.module.scss';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

function FormNewCard(): JSX.Element {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const deleteUserHandler = async () => {
    try {
      const res = await store.deleteUser();
      res && navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  const [errorMessage, setErrorMessage] = useState<string | undefined>('');
  const [oldPassword, setOldPassword] = useState<string>('');

  const inputOldPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setErrorMessage('');
    setOldPassword(e.target.value);
  };

  const [newPassword, setNewPassword] = useState<string>('');

  const inputNewPasswordHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setErrorMessage('');
    setNewPassword(e.target.value);
  };

  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');

  const inputNewPasswordConfirmHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setErrorMessage('');
    setNewPasswordConfirm(e.target.value);
  };

  const changePasswordHandler = async (): Promise<void> => {
    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      setErrorMessage('Все поля должны быть заполнены!');
    }
    if (newPassword !== newPasswordConfirm) {
      setErrorMessage('Введенные пароли не совпадают!');
    } else {
      const res = await store.changePasswordUser({ oldPassword, newPassword });
      if (res?.data.isChanged) {
        store.logout();
        navigate('/');
      }
      setErrorMessage(res?.data.message);
    }
  };

  return (
    <div className={styles.profileFormWrapper}>
      <div className="flex gap-7 justify-center backdrop-brightness-75 p-10 rounded-3xl">
        <div className="flex flex-col gap-2 items-center">
          <div className=" text-center mb-4 text-xl text-slate-400">
            Настройки профиля
          </div>
          <div>
            <img width={100} src="../profile-settings.svg" alt="" />
          </div>
          <p>{store.user.email}</p>
          <div className="my-6  text-yellow-green-corp opacity-55 hover:opacity-100 transition hover:cursor-pointer">
            Очистить историю
          </div>
          <div
            className=" text-red-700 hover:text-red-600 transition hover:cursor-pointer"
            onClick={deleteUserHandler}
          >
            Удалить аккаунт
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className=" text-center text-xl text-slate-400 mb-4">
            Сменить пароль
          </div>
          <label className="text-slate-300 text-sm">
            Введите старый пароль
          </label>
          <input
            className={styles.inputPassword}
            type="password"
            onChange={inputOldPasswordHandler}
            value={oldPassword}
          />
          <label className="text-slate-300 text-sm">Введите новый пароль</label>
          <input
            className={styles.inputPassword}
            type="password"
            onChange={inputNewPasswordHandler}
            value={newPassword}
          />
          <label className="text-slate-300 text-sm">
            Повторите новый пароль
          </label>
          <input
            className={styles.inputPassword}
            type="password"
            onChange={inputNewPasswordConfirmHandler}
            value={newPasswordConfirm}
          />
          <div className="flex justify-center flex-col items-center">
            <button
              className={styles.buttonChangePassword}
              onClick={changePasswordHandler}
            >
              Сменить пароль
            </button>
            <div className=" text-red-500 text-xs  h-10">{errorMessage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(FormNewCard);
