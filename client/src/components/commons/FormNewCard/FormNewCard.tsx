﻿import styles from './FormNewCard.module.scss';

function FormNewCard({
  
  setFormNewCard,
}: {
  setFormNewCard: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <div className={styles.modalWrapper} onClick={() => setFormNewCard(false)}>
      <div className={styles.modalWindow} onClick={(e) => e.stopPropagation()}>
        {' '}
        <div className="flex flex-col gap-2">
          <label>Номер карты:</label>
          <input type="text" placeholder="0000 0000 0000 0000" />
          <label>Имя владельца карты:</label>
          <input type="text" placeholder="IVAN IVANOV" />
          <label>Дата окончания действия:</label>
          <div className="flex">
            <input className=' w-10' type="text" placeholder="ММ" /> /
            <input className=' w-10 ml-2' type="text" placeholder="ГГ" />
          </div>
          <label>CVV/CVC:</label>
          <input type="text" placeholder="123" />
          <div className="flex justify-center">
            {' '}
            <button className={styles.buttonNewCard}>
              Добавить новую карту
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormNewCard;