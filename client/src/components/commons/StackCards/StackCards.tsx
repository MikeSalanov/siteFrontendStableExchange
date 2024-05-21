import { useState } from 'react';
import BankCard from '../BankCard/BankCard';
import FormNewCard from '../FormNewCard/FormNewCard';
import AddCardSVG from '../../../../public/add-card.svg';

interface CardInterface {
  cardNumber: number;
  cvv: number;
  month: number;
  year: number;
  owner: string;
}

interface PropsStackCards {
  cards: CardInterface[];
}

function StackCards(props: PropsStackCards): JSX.Element {
  const [activeCard, setActiveCard] = useState<number>(0);
  const [formNewCard, setFormNewCard] = useState<boolean>(false);
  const { cards } = props;

  return (
    <>
      <div className="flex flex-col bg-gradient-to-r from-red-400 to-blue-800 rounded-xl">
        {cards.map((card, index) => (
          <>
            {activeCard === index ? (
              <div className=" order-3">
                <BankCard
                  cardNumber={card.cardNumber}
                  cvv={card.cvv}
                  month={card.month}
                  year={card.year}
                  owner={card.owner}
                />
              </div>
            ) : (
              <div
                className=" w-60 h-7 border-solid border-t rounded-t-xl border-slate-500 bg-gradient-to-r from-red-400 to-blue-800 order-2 hover: cursor-pointer pl-4"
                id={`${index}`}
                onClick={() => {
                  setActiveCard(index);
                }}
              >
                {String(card.cardNumber).slice(0, 4)} ***
              </div>
            )}
          </>
        ))}
        <div className="w-60 h-7 border-solid border-slate-500 border-t rounded-t-xl bg-gradient-to-r from-red-400 to-blue-800  order-1 flex justify-center">
          {' '}
          <img
            width={15}
            src={AddCardSVG}
            alt=""
            className=" hover:cursor-pointer hover:transform hover:scale-150 transition-transform"
            onClick={() => setFormNewCard(true)}
          />{' '}
        </div>
      </div>

      {formNewCard && <FormNewCard setFormNewCard={setFormNewCard} />}
    </>
  );
}

export default StackCards;
