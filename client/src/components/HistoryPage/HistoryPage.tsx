import { useContext } from "react";
import Header from "../Header/Header";
import ExchangeHistoryFilter from "../commons/ExchangeHistoryFilter/ExchangeHistoryFilter";
import styles from "./HistoryPage.module.scss";
import { Context } from "../../main";
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

function HistoryPage(): JSX.Element {
  const { exchanges } = useContext(Context);

  // const history: HistoryItemInterface[] = [
  //   {
  //     publicId: 'efefeerer34',
  //     status: 'pending',
  //     date: '21-07-2024',
  //     time: '18:16',
  //     currencyFrom: 'usd',
  //     currencyTo: 'rubtsc',
  //     amountFrom: 100,
  //     amountTo: 1,
  //   },
  //   {
  //     publicId: 'efefeerer34',
  //     status: 'pending',
  //     date: '21-07-2024',
  //     time: '18:16',
  //     currencyFrom: 'usd',
  //     currencyTo: 'rubtsc',
  //     amountFrom: 100,
  //     amountTo: 1,
  //   },
  //   {
  //     publicId: 'efefeerer34',
  //     status: 'pending',
  //     date: '21-07-2024',
  //     time: '18:16',
  //     currencyFrom: 'usd',
  //     currencyTo: 'rubtsc',
  //     amountFrom: 100,
  //     amountTo: 1,
  //   },
  // ];

  return (
    <>
      <Header />
      <h1 className=" text-2xl text-slate-400">История операций</h1>
      <br />
      <div>
        <ExchangeHistoryFilter />
        <div className={styles.wrapperHistoryPage} >
          <table style={{marginTop: 0}}>
            <thead className=" text-black bg-slate-400">
              <tr>
                <th>ID</th>
                <th>Статус</th>
                <th>Дата</th>
                <th>Внесено</th>
                <th>Выведено</th>
              </tr>
            </thead>{" "}
            {exchanges.exchanges.map((item) => (
              <tbody>
                <tr className="hover:bg-slate-500">
                  <td className=" text-blue-500">{item.publicId}</td>
                  <td>{item.status}</td>

                  <td>
                    <div className="flex flex-col items-center">
                      {" "}
                      <div>{item.date}</div>
                      {/* <div className=" text-slate-500">{item.time}</div>{" "} */}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col items-center">
                      {" "}
                      <div>{item.currency_from}</div>
                      <div className=" text-slate-500">
                        {item.amount_from}
                      </div>{" "}
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col  items-center">
                      {" "}
                      <div>{item.currency_to}</div>
                      <div className=" text-slate-500">
                        {item.currency_to}
                      </div>{" "}
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
}

export default HistoryPage;
