import Header from '../Header/Header';
import styles from './HistoryPage.module.scss';
function HistoryPage(): JSX.Element {
  interface HistoryItemInterface {
    publicId: string;
    status: string;
    date: string;
    time: string;
    currencyFrom: string;
    currencyTo: string;
    amountFrom: number;
    amountTo: number;
  }

  const history: HistoryItemInterface[] = [
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
      status: 'pending',
      date: '21-07-2024',
      time: '18:16',
      currencyFrom: 'usd',
      currencyTo: 'rubtsc',
      amountFrom: 100,
      amountTo: 1,
    },
  ];

  return (
    <>
      <h1 className=" text-2xl text-slate-400">История операций</h1>
      <div className={styles.wrapperHistoryPage}>
        <table>
          <thead className=" text-black bg-slate-400 rounded-t-lg">
            <tr className='rounded-t-lg'>
              <th className={styles.tableHead}>ID</th>
              <th className={styles.tableHead}>Статус</th>
              <th className={styles.tableHead}>Дата</th>
              <th className={styles.tableHead}>Внесено</th>
              <th className={styles.tableHead}>Выведено</th>
            </tr>
          </thead>{' '}
          <tbody>
            {history.map((item) => (
              <tr className="hover:bg-slate-700">
                <td className={styles.tableCeil}>{item.publicId}</td>
                <td className={styles.tableCeil}>{item.status}</td>

                <td className={styles.tableCeil}>
                  <div className="flex flex-col items-center">
                    {' '}
                    <div>{item.date}</div>
                    <div className=" text-slate-500">{item.time}</div>{' '}
                  </div>
                </td>
                <td className={styles.tableCeil}> 
                  <div className="flex flex-col items-center">
                    {' '}
                    <div>{item.currencyFrom}</div>
                    <div className=" text-slate-500">
                      {item.amountFrom}
                    </div>{' '}
                  </div>
                </td>
                <td className={styles.tableCeil}>
                  <div className="flex flex-col  items-center">
                    {' '}
                    <div>{item.currencyTo}</div>
                    <div className=" text-slate-500">{item.amountTo}</div>{' '}
                  </div>
                </td>
              </tr>
            ))}{' '}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default HistoryPage;
