import { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import styles from './AdminExchangePage.module.scss';
import { Context } from '../../main';
import { EXCHANGES_API_URL} from "../../http";

function AdminExchangePage(): JSX.Element {
  const { store, exchanges } = useContext(Context);
  
  useEffect(() => {
    exchanges.getExchanges({});
  }, []);
  
  const handleClickToPay = async (exchangeId: string) => {
    try {
      const response = await fetch(`${EXCHANGES_API_URL}/finish?exchangeId=${exchangeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      
      if (response.ok) {
        exchanges.getExchanges({});
      } else {
        throw new Error('Failed to finish exchange');
      }
    } catch (error) {
      console.error('Error finishing exchange:', error);
    }
  };
  
  return (
    <>
      <div className="flex justify-center">
        <div className={styles.buttonCustom}>
          <Link to="/admin/users">Пользователи</Link>{' '}
        </div>
        <div
          className={styles.buttonCustom}
          onClick={() => {
            store.logout();
          }}
        >
          Выйти
        </div>
        {' '}
      </div>
      <h1 className="mt-20 text-2xl text-slate-300">Обменные операции</h1>
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
          </thead>
          {exchanges.exchanges.map((item) => (
            <tbody key={item.public_id}>
            <tr>
              <td className="text-blue-500">{item.public_id}</td>
              <td>
                <div className="flex flex-col gap-4 items-center">
                  {item.status}
                  {(item.status === 'payouting' ? (
                    <button className={styles.buttonAccept} onClick={() => handleClickToPay(item.public_id)}>
                      Выплатить
                    </button>
                  ) : item.status === 'finished' ? (
                    <div className={styles.buttonPaid}>
                      Выплачено
                    </div>
                  ) : (<></>))}
                </div>
              </td>
              <td>
                <div className="flex flex-col items-center">
                  <div>{new Date(item.createdAt).toLocaleDateString()}</div>
                  <div className="text-slate-500">{new Date(item.createdAt).toLocaleTimeString()}</div>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-center">
                  <div>{item.currency_from}</div>
                  <div className="text-slate-500">{item.amount_from}</div>
                </div>
              </td>
              <td>
                <div className="flex flex-col items-center">
                  <div>{item.currency_to}</div>
                  <div className="text-slate-500">{item.amount_to}</div>
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
