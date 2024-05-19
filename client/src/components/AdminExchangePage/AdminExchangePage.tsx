import { Link } from 'react-router-dom';
import styles from './AdminExchangePage.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import { useContext } from 'react';
function AdminExchangePage(): JSX.Element {
  interface ExchangeInterface {
    publicId: string;
    status: string;
    date: string;
    time: string;
    currencyFrom: string;
    currencyTo: string;
    amountFrom: number;
    amountTo: number;
  }

  const exchanges: ExchangeInterface[] = [
    {
      publicId: 'efefeerer34',
      status: 'pending',
      date: '21-07-2024',
      time: '18:16',
      currencyFrom: 'usd',
      currencyTo: 'rubtsc',
      amountFrom: 100,
      amountTo: 1,
    },
    {
      publicId: 'efefeerer34',
      status: 'pending',
      date: '21-07-2024',
      time: '18:16',
      currencyFrom: 'usd',
      currencyTo: 'rubtsc',
      amountFrom: 100,
      amountTo: 1,
    },
    {
      publicId: 'efefeerer34',
      status: 'finished',
      date: '21-07-2024',
      time: '18:16',
      currencyFrom: 'usd',
      currencyTo: 'rubtsc',
      amountFrom: 100,
      amountTo: 1,
    },
    {
      publicId: 'efefeerer34',
      status: 'pending',
      date: '21-07-2024',
      time: '18:16',
      currencyFrom: 'usd',
      currencyTo: 'rubtsc',
      amountFrom: 100,
      amountTo: 1,
    },
    {
      publicId: 'efefeerer34',
      status: 'finished',
      date: '21-07-2024',
      time: '18:16',
      currencyFrom: 'usd',
      currencyTo: 'rubtsc',
      amountFrom: 100,
      amountTo: 1,
    },
  ];
  const { store } = useContext(Context);
  return (
    <>
      <h1 className="mt-20 text-2xl text-slate-300">Обменные операции</h1>
      <div>
        <Link to="/admin/users">Пользователи</Link>{' '}
        <div onClick={store.logout}>Выйти</div>{' '}
      </div>
      <div className={styles.wrapperExchangePage}>
        <table className={styles.tableExchanges}>
          <thead className="text-black bg-slate-400 rounded-lg">
            <tr className="rounded-t-lg">
              <th className="rounded-tl-lg">ID</th>
              <th>Статус</th>
              <th>Дата</th>
              <th>Внесено</th>
              <th className="rounded-tr-lg">Выведено</th>
            </tr>
          </thead>{' '}
          {exchanges.map((item) => (
            <tbody>
              <tr>
                <td className=" text-blue-500">{item.publicId}</td>
                <td>
                  <div className="flex flex-col gap-4 items-center">
                    {item.status}{' '}
                    {item.status === 'pending' && (
                      <button className={styles.buttonAccept}>
                        Подтвердить
                      </button>
                    )}
                  </div>
                </td>

                <td>
                  <div className="flex flex-col items-center">
                    {' '}
                    <div>{item.date}</div>
                    <div className="text-slate-500">{item.time}</div>{' '}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-center">
                    {' '}
                    <div>{item.currencyFrom}</div>
                    <div className=" text-slate-500">
                      {item.amountFrom}
                    </div>{' '}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col  items-center">
                    {' '}
                    <div>{item.currencyTo}</div>
                    <div className=" text-slate-500">{item.amountTo}</div>{' '}
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default observer(AdminExchangePage);
