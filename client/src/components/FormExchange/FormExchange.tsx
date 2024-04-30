import { useEffect, useState } from 'react';
import styles from './FromExchange.module.scss';

function FormExchange(): JSX.Element {
  const [inputMoneyValue, setInputMoneyValue] = useState<number>(0);
  const [outputMoneyValue, setOutputMoneyValue] = useState<number>(0);
  const EXCHANGE_RATE: number = 30; // Захардкодил курс для мгновенного перевода при изменении одного из инпутов в дальнейшем скорее всего он будет приходить из бэка

  const [inputCurrencies, setInputCurrencies] = useState<string[]>([
    'USD',
    'EUR',
  ]); // массив с вводимыми валютами (те, которые переводит пользователь)

  const [outputCurrencies, setOutputCurrencies] = useState<string[]>([
    'Tinkoff RUB',
    'Sber RUB',
  ]); // массив с выводимыми валютами (те, которые хочет получить пользователь)

  const inputMoneyHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputMoneyValue(Number(e.target.value));
    setOutputMoneyValue(Number(e.target.value) / EXCHANGE_RATE);
  };

  const outputMoneyHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOutputMoneyValue(Number(e.target.value));
    setInputMoneyValue(Number(e.target.value) * EXCHANGE_RATE);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const changeInputCurrencyHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    console.log(e.target.value);

  //   fetch(`/pairs?from=${e.target.value}`)
  //     .then((res) => res.json)
  //     .then((res) => setOutputCurrencies(res.currencies))
  //     .catch((err) => console.log({ ERROR_GET_OUTPUT_CURRENCIES: err }));
 };

  //Запрос на получение имеющихся валют (для первого инпута)
  // useEffect(() => {
  //   fetch('./currencies')
  //     .then((res) => res.json())
  //     .then((res) => setInputCurrencies(res.currencies))
  //     .catch((err) => console.log({ ERROR_GET_CURRENCIES: err }));
  // }, []);

  return (
    <>
      <div className={styles.wrapperForm}>
        <form className={styles.form} onSubmit={submitHandler}>
          <div className="flex">
            {' '}
            <div className="flex flex-col">
              {' '}
              <span className=" bg-input-gray text-xs text-gray-500 text-left p-1">
                You Send
              </span>{' '}
              <input
                className=" bg-input-gray focus:outline-none text-white"
                type="number"
                onChange={inputMoneyHandler}
                value={inputMoneyValue}
              />
            </div>{' '}
            <div className="flex  items-center bg-input-currency">
              <select
                name="input-currency"
                className="w-full h-full  bg-input-currency"
                onChange={changeInputCurrencyHandler}
              >
                {inputCurrencies?.map((currency) => (
                  <option value={`${currency}`}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex">
            {' '}
            <div className="flex flex-col">
              {' '}
              <span className=" bg-input-gray text-xs text-gray-500 text-left p-1">
                You Get
              </span>{' '}
              <input
                className=" bg-input-gray focus:outline-none text-white appearance-none"
                type="number"
                onChange={outputMoneyHandler}
                value={outputMoneyValue}
              />
            </div>{' '}
            <div className="flex  items-center bg-input-currency">
              <select
                name="output-currency"
                className="w-full h-full  bg-input-currency"
              >
                {outputCurrencies?.map((currency) => (
                  <option value={`${currency}`}>{currency}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className=" bg-green-400 text-white">
            Exchange
          </button>
        </form>
      </div>
    </>
  );
}

export default FormExchange;
