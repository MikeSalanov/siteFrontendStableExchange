import { useContext, useState } from 'react';
import styles from './FormForAddRuCard.module.scss';
import { Context } from '../../../main';

function FormForAddRuCard(): JSX.Element {
  const [cardNumInput, setCardNumInput] = useState<string>('');
  const [cardExpiryMonthInput, setCardExpiryMonthInput] = useState<string>('');
  const [cardExpiryYearInput, setCardExpiryYearInput] = useState<string>('');
  const [cardCVCInput, setCardCVCInput] = useState<string>('');
  const [cardHolderInput, setCardHolderInput] = useState<string>('');

  const { store } = useContext(Context);

  const handleAddCard = () => {
    const expiryDate = `${cardExpiryMonthInput}/${cardExpiryYearInput}`;
    store.createRuCard(cardNumInput, expiryDate, cardCVCInput);
  };

  return (
    <div className="flex flex-col gap-2">
      <label>Номер карты:</label>
      <input 
        type="text" 
        placeholder="0000 0000 0000 0000" 
        value={cardNumInput} 
        onChange={(e) => setCardNumInput(e.target.value)}
      />
      <label>Имя владельца карты:</label>
      <input 
        type="text" 
        placeholder="IVAN IVANOV" 
        value={cardHolderInput}
        onChange={(e) => setCardHolderInput(e.target.value)}
      />
      <label>Дата окончания действия:</label>
      <div className="flex">
        <input 
          className="w-10" 
          type="text" 
          placeholder="ММ" 
          value={cardExpiryMonthInput} 
          onChange={(e) => setCardExpiryMonthInput(e.target.value)}
        /> /
        <input 
          className="w-10 ml-2" 
          type="text" 
          placeholder="ГГ" 
          value={cardExpiryYearInput} 
          onChange={(e) => setCardExpiryYearInput(e.target.value)}
        />
      </div>
      <label>CVV/CVC:</label>
      <input 
        type="text" 
        placeholder="123" 
        value={cardCVCInput}
        onChange={(e) => setCardCVCInput(e.target.value)}
      />
      <div className="flex justify-center">
        <button className={styles.buttonNewCard} onClick={handleAddCard}>
          Добавить новую карту
        </button>
      </div>
    </div>
  );
}

export default FormForAddRuCard;