import { useState } from 'react';

function BankCard(props: {
  cardNumber: number;
  cvv: number;
  month: number;
  year: number;
  owner: string;
}): JSX.Element {
  const { cardNumber, cvv, month, year, owner } = props;

  const cardNumberStr: string | undefined = cardNumber
    ?.toString()
    ?.match(/\d{1,4}/g)
    ?.join(' ');

  const [cvvViseble, setCvvViseble] = useState<boolean>(false);
  return (
    <>
      <div className="bg-gradient-to-r from-gray-500 to-blue-950   w-60 h-36 rounded-xl relative text-lg border-solid border border-slate-500 ">
        <div className=" absolute  bottom-14   left-14">{cardNumberStr}</div>
        <div className=" absolute   bottom-7  left-28">
          {month}/{year}
        </div>
        {cvvViseble && (
          <p className="absolute bottom-7  px-1  left-16 bg-white text-black rounded-sm">
            {' '}
            {cvv}
          </p>
        )}

        <div className=" absolute   bottom-1  left-14"> {owner}</div>
        <img
          width={30}
          className="absolute bottom-14 left-1 "
          src="chip-debit.svg"
          alt="chip"
        />
        <div className="absolute right-3 top-2">
          <img
            className="hover:cursor-pointer"
            onClick={() => {
              setCvvViseble((prev) => !prev);
            }}
            width={20}
            src={
              cvvViseble
                ? 'eye-close.svg'
                : 'eye-open.svg'
            }
          />
        </div>
      </div>
    </>
  );
}

export default BankCard;
