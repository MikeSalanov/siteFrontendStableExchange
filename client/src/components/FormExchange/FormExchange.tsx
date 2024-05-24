import React, { useContext, useEffect, useState } from 'react';
import styles from './FormExchange.module.scss';
import { useNavigate } from 'react-router-dom';
import CurrencyTicker from '../CurrencyTicker/CurrencyTicker';
import { Context } from '../../main';
import { observer } from 'mobx-react-lite';

function FormExchange(): JSX.Element {


  const { store } = useContext(Context);

  const [inputMoneyValue, setInputMoneyValue] = useState<number>(0);
  const [outputMoneyValue, setOutputMoneyValue] = useState<number>(0);

  const navigate = useNavigate();

  const [inputCurrencies] = useState<string[]>(['USD $']);

  const [outputCurrencies] = useState<string[]>(['Tinkoff RUB', 'Sber RUB']);

  const currenciesOrder: {
    [tickerName: string]: string;
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
    setInputMoneyValue(Number(e.target.value.replace(/\D/g, '')));
    setOutputMoneyValue(
      Number(
        (
          (Number(e.target.value.replace(/\D/g, '')) * store.priceTo) /
          store.priceFrom
        ).toFixed(2)
      )
    );
  };

  const outputMoneyHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOutputMoneyValue(Number(e.target.value.replace(/\D/g, '')));
    setInputMoneyValue(Number(e.target.value) / store.priceTo);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (store.priceTo) {
      store.setCurrAmount(inputMoneyValue);
      navigate(
        `exchange?from=${currenciesOrder[currInputCurrency]}&to=${currenciesOrder[currOutputCurrency]}`
      );
    }
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


  return (
    <>
      <div className={styles.wrapperForm}>
        <CurrencyTicker />
        <form className={styles.form} onSubmit={submitHandler}>
          <div className="flex">
            <div className="flex flex-col">
              <span className="bg-input-gray text-xs text-gray-500 text-left p-2 rounded-tl-xl">
                Вы отправите
              </span>
              <input
                className="bg-input-gray focus:outline-none text-white pl-4 pb-2 h-full rounded-bl-xl"
                type="text"
                onChange={inputMoneyHandler}
                value={store.priceTo ? inputMoneyValue : 'Обновление курса...'}
                disabled={!store.priceTo}
              />
            </div>{' '}
            <div className="flex items-center bg-input-currency">
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
                          onClick={(e) =>
                            setInputCurrency(
                              (e.target as HTMLElement).innerText
                            )
                          }
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
              <span className=" bg-input-gray text-xs text-gray-500 text-left p-2 rounded-tl-xl">
                Вы получите
              </span>{' '}
              <input
                className=" bg-input-gray focus:outline-none text-white appearance-none pl-4 pb-2 h-full rounded-bl-xl"
                type="text"
                onChange={outputMoneyHandler}
                value={outputMoneyValue}
                disabled={true}
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
                          onClick={(e) =>
                            setOutputCurrency(
                              (e.target as HTMLElement).innerText
                            )
                          }
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

export default observer(FormExchange);
