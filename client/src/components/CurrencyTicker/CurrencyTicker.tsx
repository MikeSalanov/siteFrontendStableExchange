import { useContext, useEffect, useState } from 'react';
import styles from './CurrencyTicker.module.scss';
import { Hourglass } from 'react-loader-spinner';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';

function CurrencyTicker(): JSX.Element {
  const { store } = useContext(Context);

  const [timer, setTimer] = useState<number>(5);

  const colors: string[] = [
    'text-red-600',
    'text-red-600',
    'text-orange-500',
    'text-orange-500',
    'text-green-500',
    'text-green-500',
  ];

  useEffect(() => {
    const intervalFetch = setInterval(() => {
      // fetch('https://alfabit.org/api/v1/cashe/operations/Tether(USDT)%20TRC20')
      //   .then((res) => {
      //     setTimer(5);
      //     return res.json();
      //   })
      //   .then((res) => store.setPriceTo(res[0].exchange_rate.toFixed(4)))
      //   .catch((e) => console.log({ ERROR_GET_CURRENCY: e }));
      // fetch(
      //   'https://alfabit.org/api/v1/cashe/operations/%D0%A2%D0%B8%D0%BD%D1%8C%D0%BA%D0%BE%D1%84%D1%84(RUB)'
      // )
      //   .then((res) => {
      //     setTimer(5);
      //     return res.json();
      //   })
      //   .then((res) => store.setPriceFrom(res[20].exchange_rate.toFixed(4)))
      //   .catch((e) => console.log({ ERROR_GET_CURRENCY: e }));

      fetch(
        'https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=ETH'
      )
        .then((res) => {
          setTimer(5);
          return res.json();
        })
        .then((res) => {store.setPriceTo(res.ETH);
          
        }
        );
        fetch(
          'https://min-api.cryptocompare.com/data/price?fsym=RUB&tsyms=ETH'
        )
          .then((res) => {
            setTimer(5);
            return res.json();
          })
          .then((res) => {
            store.setPriceFrom(res.ETH);
          }
          );
    }, 6000);
    return () => {
      clearInterval(intervalFetch);
    };
  }, []);

  useEffect(() => {
    const intervalTimer = setInterval(() => {
      setTimer((prev) => (prev === 0 ? 0 : prev - 1));
    }, 1000);
    return () => {
      clearInterval(intervalTimer);
    };
  }, []);

  return (
    <div className={styles.wrapperCurrencyTicker}>
      {store.priceTo && store.priceFrom ? (
        <div className={styles.timerCurrencyBlock}>
          <p>Текущий курс:</p>
          <p>1 USD = {store.priceTo} ETH</p>
          <p>{store.priceFrom} ETH = 1 RUB</p>
          <p className={colors[timer]}>0{timer}:00</p>
        </div>
      ) : (
        <div className={styles.timerCurrencyBlock}>
          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={['#cdff00', '#00ffff']}
          />
        </div>
      )}
    </div>
  );
}

export default observer(CurrencyTicker);
