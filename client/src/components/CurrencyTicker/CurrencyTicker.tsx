﻿import { useContext, useEffect, useState } from 'react';
import styles from './CurrencyTicker.module.scss';
import { Hourglass } from 'react-loader-spinner';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';

function CurrencyTicker(): JSX.Element {
  const {store} = useContext(Context);
  
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
      fetch('https://alfabit.org/api/v1/cashe/operations/Tether(USDT)%20TRC20')
        .then((res) => {
          setTimer(5);
          return res.json();
        })
        .then((res) => store.setPrice(res[0].exchange_rate.toFixed(4)))
        .catch((e) => console.log({ ERROR_GET_CURRENCY: e }));
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
      {store.price ? (
        <div className={styles.timerCurrencyBlock}>
          <p>Текущий курс: 1 USDT = {store.price} RUB</p>

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

export default observer (CurrencyTicker);
