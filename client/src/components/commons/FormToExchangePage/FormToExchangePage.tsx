import { useContext, useEffect, useState } from 'react';
import styles from './FormToExchangePage.module.scss';
import { RotatingLines } from 'react-loader-spinner';
import { Context } from '../../../main';

function FormToExchangePage({
  fromCurrency,
  toCurrency,
}: {
  fromCurrency: string | null;
  toCurrency: string | null;
}): JSX.Element {
  const { store } = useContext(Context);

  const [inputMoneyValue, setInputMoneyValue] = useState<number>(
    store.currAmount
  );
  const [outputMoneyValue, setOutputMoneyValue] = useState<number>(
    Number(((store.currAmount * store.priceTo) / store.priceFrom).toFixed(2))
  );
  const currenciesOrder: {
    [currencyName: string]: string;
  } = {
    usd: 'USD $',
    eur: 'EUR €',
    tscrub: 'Tinkoff RUB',
    sbrub: 'Sber RUB',
  };

  const currenciesReverseOrder: {
    [currencyName: string]: string;
  } = {
    'USD $': 'usd',
    'EUR €': 'eur',
    'Tinkoff RUB': 'tscrub',
    'Sber RUB': 'sbrub',
  };

  const [inputCurrencies] = useState<string[]>(['USD $']);

  const [outputCurrencies] = useState<string[]>(['Tinkoff RUB', 'Sber RUB']);

  const inputCards: string[] = [
    '1234 5678 91011 1213',
    '0000 0000 0000 0000',
    '1111 2222 3333 4444',
  ];
  const outputCards: string[] = [
    '2222 5678 3333 4444',
    '4444 3333 2222 1111',
    '9999 6666 7777 2222',
  ];
  const [currInputCard, setCurrInputCard] = useState<string>(inputCards[0]);
  const [currOutputCard, setCurrOutputCard] = useState<string>(outputCards[0]);

  const [currInputCurrency, setInputCurrency] = useState<string>(
    fromCurrency ? currenciesOrder[fromCurrency] : ''
  );

  const [currOutputCurrency, setOutputCurrency] = useState<string>(
    toCurrency ? currenciesOrder[toCurrency] : ''
  );

  const [inputCurrencyHidden, setInputCurrencyHidden] = useState<boolean>(true);
  const [outputCurrencyHidden, setOutputCurrencyHidden] =
    useState<boolean>(true);

  const [inputCardHidden, setInputCardHidden] = useState<boolean>(true);

  const [outputCardHidden, setOutputCardHidden] = useState<boolean>(true);

  const [firstSubmit, setFirstSubmit] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [secondSubmit, setSecondSubmit] = useState<boolean>(false);

  const [currentBalance, setCurrentBalance] = useState<number>(0);

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
    setInputMoneyValue(
      Number(e.target.value.replace(/\D/g, '')) / store.priceTo
    );
  };

  const clickOutsideInput = (e: Event): void => {
    if ((e.target as Element).id !== 'input-custom-select') {
      setInputCurrencyHidden(true);
    }
  };

  const clickOutsideOutput = (e: Event): void => {
    if ((e.target as Element).id !== 'output-custom-select') {
      setOutputCurrencyHidden(true);
    }
  };

  const clickOutsideInputCard = (e: Event): void => {
    if ((e.target as Element).id !== 'input-card-select') {
      setInputCardHidden(true);
    }
  };

  const clickOutsideOutputCard = (e: Event): void => {
    if ((e.target as Element).id !== 'output-card-select') {
      setOutputCardHidden(true);
    }
  };

  useEffect(() => {
    document.addEventListener(
      'click',
      clickOutsideInput as EventListenerOrEventListenerObject
    );
    document.addEventListener(
      'click',
      clickOutsideOutput as EventListenerOrEventListenerObject
    );
    document.addEventListener(
      'click',
      clickOutsideOutputCard as EventListenerOrEventListenerObject
    );
    document.addEventListener(
      'click',
      clickOutsideInputCard as EventListenerOrEventListenerObject
    );
    return () => {
      document.removeEventListener(
        'click',
        clickOutsideInput as EventListenerOrEventListenerObject
      );
      document.removeEventListener(
        'click',
        clickOutsideOutput as EventListenerOrEventListenerObject
      );
      document.removeEventListener(
        'click',
        clickOutsideOutputCard as EventListenerOrEventListenerObject
      );
      document.removeEventListener(
        'click',
        clickOutsideInputCard as EventListenerOrEventListenerObject
      );
    };
  }, []);

  const firstSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstSubmit(true);
    setLoader(true);
    setCurrentBalance((prev: number) =>
      Number((prev + inputMoneyValue * store.priceTo).toFixed(2))
    );

    const res = await fetch('http://stable-exchange.top/exchanges', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        currency_from: currenciesReverseOrder[currInputCurrency],
        currency_to: currenciesReverseOrder[currOutputCurrency],
        amount_from: Number(inputMoneyValue),
        amount_to: Number(outputMoneyValue),
        card_number_from: currInputCard.replace(/ /g, ''),
      }),
    });
    setLoader(false);
  };

  const secondSubmitHandler = async () => {
    setCurrentBalance(0);
    const res = await fetch('http://stable-exchange.top/exchanges/payout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        card_number_to: currOutputCard.replace(/ /g, ''),
      }),
    });

    if (res.ok) {
      setSecondSubmit(true);
    }
  };

  return (
    <>
      <div className={styles.wrapperForm}>
        <form onSubmit={firstSubmitHandler} className={styles.form}>
          <div className="flex">
            {' '}
            <div className="flex flex-col">
              {' '}
              <span className=" bg-input-gray text-xs text-gray-500 text-left p-2 rounded-tl-xl">
                Вы отправите
              </span>{' '}
              <input
                className=" bg-input-gray focus:outline-none text- pl-4 pb-2 h-full rounded-bl-xl"
                type="text"
                onChange={inputMoneyHandler}
                value={inputMoneyValue}
                disabled={firstSubmit}
              />
            </div>{' '}
            <div className="flex  items-center bg-input-currency">
              <div className={styles.customSelect}>
                <div
                  id="input-custom-select"
                  className={
                    !firstSubmit ? styles.currOption : styles.currOptionDisabled
                  }
                  onClick={() => {
                    !firstSubmit &&
                      setInputCurrencyHidden((prev: boolean) => !prev);
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
                  className={
                    !firstSubmit ? styles.currOption : styles.currOptionDisabled
                  }
                  onClick={() => {
                    !firstSubmit &&
                      setOutputCurrencyHidden((prev: boolean) => !prev);
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
          <div className="flex flex-col items-center">
            <div className=" text-sm mb-4">
              Выберите карту с которой будут зачислены средства
            </div>
            <div className="flex  items-center bg-white">
              <div className={styles.customCardsSelect}>
                <div
                  id="input-card-select"
                  className={
                    !firstSubmit ? styles.currCard : styles.currCardDisabled
                  }
                  onClick={() => {
                    !firstSubmit &&
                      setInputCardHidden((prev: boolean) => !prev);
                  }}
                >
                  {' '}
                  {currInputCard} <span className=" text-xs">▼</span>
                </div>{' '}
                <div
                  className={
                    inputCardHidden
                      ? styles.customOptionsHidden
                      : styles.customCardOptions
                  }
                >
                  {inputCards?.map((card) => {
                    if (card !== currInputCard) {
                      return (
                        <p
                          className={styles.customCardOption}
                          onClick={(e) =>
                            setCurrInputCard(
                              (e.target as HTMLElement).innerText
                            )
                          }
                        >
                          {card}
                        </p>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={styles.buttonExchange}
            disabled={firstSubmit}
          >
            Подтвердить
          </button>
        </form>
        {loader ? (
          <div className="flex justify-center">
            <RotatingLines
              visible={true}
              width="40"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        ) : firstSubmit ? (
          <div>
            <div className="flex flex-col items-center">
              <div className=" text-sm mb-4">
                Баланс на вашем кошелке составляет
              </div>
              <h2 className=" text-xl mb-4">{currentBalance} USDT</h2>
              <div className=" text-sm mb-4">
                Выберите карту на которую будут зачислены средства
              </div>
              <div className="flex  items-center bg-white mb-4">
                <div className={styles.customCardsSelect}>
                  <div
                    id="output-card-select"
                    className={
                      !secondSubmit ? styles.currCard : styles.currCardDisabled
                    }
                    onClick={() => {
                      !secondSubmit && setOutputCardHidden((prev) => !prev);
                    }}
                  >
                    {' '}
                    {currOutputCard} <span className=" text-xs">▼</span>
                  </div>{' '}
                  <div
                    className={
                      outputCardHidden
                        ? styles.customOptionsHidden
                        : styles.customCardOptions
                    }
                  >
                    {outputCards?.map((card) => {
                      if (card !== currOutputCard) {
                        return (
                          <p
                            className={styles.customCardOption}
                            onClick={(e) =>
                              setCurrOutputCard(
                                (e.target as HTMLElement).innerText
                              )
                            }
                          >
                            {card}
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                onClick={secondSubmitHandler}
                className={styles.buttonExchange}
                disabled={secondSubmit}
              >
                Подтвердить
              </button>
            </div>
            <div>
              {secondSubmit && (
                <div className="flex flex-col items-center">
                  <img width={50} src="done-round.svg" alt="done-round.svg" />{' '}
                  <p>Средства успешно зачислены</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default FormToExchangePage;
