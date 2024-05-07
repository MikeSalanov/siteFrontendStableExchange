import { useSearchParams } from 'react-router-dom';
import styles from './ExchangePage.module.scss';
import FormToExchangePage from '../commons/FormToExchangePage/FormToExchangePage';
function ExchangePage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const fromCurrency = searchParams.get('from');
  const toCurrency = searchParams.get('to');

  return (
    <>
      <div className={styles.wrapperExchangePage}>
        {' '}
        <div className='flex justify-center my-5'>
          <p>Пожалуйста заполните форму с деталями транзакции</p>
        </div>
        <FormToExchangePage
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
        />
      </div>
    </>
  );
}

export default ExchangePage;
