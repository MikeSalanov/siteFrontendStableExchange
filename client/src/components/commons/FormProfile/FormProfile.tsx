import { useContext } from 'react';
import { Context } from '../../../main';
import styles from './FormProfile.module.scss';

function FormNewCard(): JSX.Element {
  const { store } = useContext(Context);

  return (
    <div className={styles.profileFormWrapper}>
      <div className="flex gap-7 justify-center backdrop-brightness-75 p-10 rounded-3xl">
        <div className="flex flex-col gap-2 items-center">
          <div className=" text-center mb-4 text-center text-xl text-slate-400">
            Настройки профиля
          </div>
          <div>
            <img
              width={100}
              src="../../../public/profile-settings.svg"
              alt=""
            />
          </div>
          <p>{store.user.email}</p>
          <div className="my-6  text-yellow-green-corp opacity-55 hover:opacity-100 transition hover:cursor-pointer">
            Очистить историю
          </div>
          <div className=" text-red-700 hover:text-red-600 transition hover:cursor-pointer">
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
          <input className={styles.inputPassword} type="password" />
          <label className="text-slate-300 text-sm">Введите новый пароль</label>
          <input className={styles.inputPassword} type="password" />
          <label className="text-slate-300 text-sm">
            Повторите новый пароль
          </label>
          <input className={styles.inputPassword} type="password" />
          <div className="flex justify-center">
            <button className={styles.buttonChangePassword}>
              Сменить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormNewCard;
