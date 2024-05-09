import React, { useEffect, useState } from 'react';
import styles from './FormExchange.module.scss';
import { useNavigate } from 'react-router-dom';

function FormExchange(): JSX.Element {
  const [inputMoneyValue, setInputMoneyValue] = useState<number>(0);
  const [outputMoneyValue, setOutputMoneyValue] = useState<number>(0);
  const EXCHANGE_RATE: number = 100; // Захардкодил курс для мгновенного перевода при изменении одного из инпутов в дальнейшем скорее всего он будет приходить из бэка

  const navigate = useNavigate();

  const [inputCurrencies] = useState<string[]>([
    'USD $',
    'EUR €',
  ]); // массив с вводимыми валютами (те, которые переводит пользователь)

  const [outputCurrencies] = useState<string[]>([
    'Tinkoff RUB',
    'Sber RUB',
  ]); // массив с выводимыми валютами (те, которые хочет получить пользователь)

  const currenciesOrder: {
    [tickerName: string]: string
  } = {
    'USD $': 'usd',
    'EUR €': 'eur',
    'Tinkoff RUB': 'tscrub',
    'Sber RUB': 'sbrub',
  };

  const [currInputCurrency, setInputCurrency] = useState<string>(
    inputCurrencies[0]
  );

  const [currOutputCurrency, setOutputCurrency] = useState<string>(
    outputCurrencies[0]
  );

  const [inputCurrencyHidden, setInputCurrencyHidden] = useState<boolean>(true);
  const [outputCurrencyHidden, setOutputCurrencyHidden] =
    useState<boolean>(true);

  const inputMoneyHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMoneyValue(Number(e.target.value));
    setOutputMoneyValue(Number(e.target.value) * EXCHANGE_RATE);
  };

  const outputMoneyHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOutputMoneyValue(Number(e.target.value));
    setInputMoneyValue(Number(e.target.value) / EXCHANGE_RATE);
  };

  const submitHandler = (): void => {
    navigate(
      `exchange?from=${currenciesOrder[currInputCurrency]}&to=${currenciesOrder[currOutputCurrency]}`
    );
  };

  const clickOutsideInput = (e: MouseEvent) => {
    if ((e.target as Element).id !== 'input-custom-select') {
      setInputCurrencyHidden(true);
    }
  };

  const clickOutsideOutput = (e: MouseEvent) => {
    if ((e.target as Element).id !== 'output-custom-select') {
      setOutputCurrencyHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', clickOutsideInput);
    document.addEventListener('click', clickOutsideOutput);
    return () => {
      document.removeEventListener('click', clickOutsideInput);
      document.removeEventListener('click', clickOutsideOutput);
    };
  }, []);

  // const changeInputCurrencyHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ): void => {
  //   console.log(e.target.value);
  //
  //   //   fetch(`/pairs?from=${e.target.value}`)
  //   //     .then((res) => res.json)
  //   //     .then((res) => setOutputCurrencies(res.currencies))
  //   //     .catch((err) => console.log({ ERROR_GET_OUTPUT_CURRENCIES: err }));
  // };
  //
  // //Запрос на получение имеющихся валют (для первого инпута)
  // // useEffect(() => {
  // //   fetch('./currencies')
  // //     .then((res) => res.json())
  // //     .then((res) => setInputCurrencies(res.currencies))
  // //     .catch((err) => console.log({ ERROR_GET_CURRENCIES: err }));
  // // }, []);

  return (
    <>
      <div className={styles.wrapperForm}>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className="flex">
            {' '}
            <div className="flex flex-col">
              {' '}
              <span className=" bg-input-gray text-xs text-gray-500 text-left p-1">
                Вы отправите
              </span>{' '}
              <input
                className=" bg-input-gray focus:outline-none text-white pl-2 h-full"
                type="number"
                onChange={inputMoneyHandler}
                value={inputMoneyValue}
              />
            </div>{' '}
            <div className="flex  items-center bg-input-currency">
              <div className={styles.customSelect}>
                <div
                  id="input-custom-select"
                  className={styles.currOption}
                  onClick={() => {
                    setInputCurrencyHidden((prev) => !prev);
                  }}
                >
                  {' '}
                  {currInputCurrency} <span className=" text-xs">▼</span>
                </div>{' '}
                <div
                  className={
                    inputCurrencyHidden
                      ? styles.customOptionsHidden
                      : styles.customOptions
                  }
                >
                  {inputCurrencies?.map((currency) => {
                    if (currency !== currInputCurrency) {
                      return (
                        <p
                          className={styles.customOption}
                          onClick={(e) => setInputCurrency((e.target as HTMLElement).innerText)}
                        >
                          {currency}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex">
            {' '}
            <div className="flex flex-col">
              {' '}
              <span className=" bg-input-gray text-xs text-gray-500 text-left p-1">
                Вы получите
              </span>{' '}
              <input
                className=" bg-input-gray focus:outline-none text-white appearance-none pl-2 h-full"
                type="number"
                onChange={outputMoneyHandler}
                value={outputMoneyValue}
              />
            </div>{' '}
            <div className="flex  items-center bg-input-currency">
              <div className={styles.customSelect}>
                <div
                  id="output-custom-select"
                  className={styles.currOption}
                  onClick={() => {
                    setOutputCurrencyHidden((prev) => !prev);
                  }}
                >
                  {' '}
                  {currOutputCurrency} <span className=" text-xs">▼</span>
                </div>{' '}
                <div
                  className={
                    outputCurrencyHidden
                      ? styles.customOptionsHidden
                      : styles.customOptions
                  }
                >
                  {outputCurrencies?.map((currency) => {
                    if (currency !== currOutputCurrency) {
                      return (
                        <p
                          className={styles.customOption}
                          onClick={(e) => setOutputCurrency((e.target as HTMLElement).innerText)}
                        >
                          {currency}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button type="submit" className={styles.buttonExchange}>
              Обмен
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default FormExchange;
