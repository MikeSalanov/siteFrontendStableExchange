import { useSearchParams } from 'react-router-dom';
import styles from './ExchangePage.module.scss';
import FormToExchangePage from '../commons/FormToExchangePage/FormToExchangePage';
import ButtonHome from '../commons/ButtonHome/ButtonHome';
function ExchangePage(): JSX.Element {
  const [searchParams] = useSearchParams();
  const fromCurrency: string | null = searchParams.get('from');
  const toCurrency: string | null = searchParams.get('to');

  return (
    <>
      <div className={styles.wrapperExchangePage}>
      <ButtonHome/>
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
