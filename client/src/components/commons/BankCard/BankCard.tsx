function BankCard(props: {
  cardNumber: string;
  expiry_date: string;
}): JSX.Element {
  const { cardNumber, expiry_date } = props;

  return (
    <>
      <div className="bg-gradient-to-r from-gray-500 to-blue-950 w-60 h-36 rounded-xl relative text-lg border-solid border border-slate-500 ">
        <div className="absolute bottom-14 left-14">{cardNumber}</div>
        <div className="absolute bottom-7 left-28">
          {expiry_date}
        </div>
        <img
          width={30}
          className="absolute bottom-14 left-1 "
          src="../chip-debit.svg"
          alt="chip"
        />
      </div>
    </>
  );
}

export default BankCard;
