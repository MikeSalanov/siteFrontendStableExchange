import styles from './ProfilePage.module.scss';
import FormProfile from '../commons/FormProfile/FormProfile';
import StackCards from '../commons/StackCards/StackCards';

function ProfilePage(): JSX.Element {
  const cards: {
    cardNumber: number;
    cvv: number;
    month: number;
    year: number;
    owner: string;
  }[] = [
    {
      cardNumber: 1234567891011234,
      cvv: 111,
      month: 11,
      year: 24,
      owner: 'IVAN IVANOV',
    },
    {
      cardNumber: 1111111111111111,
      cvv: 498,
      month: 6,
      year: 26,
      owner: 'ALEXEY SIDOROV',
    },
    {
      cardNumber: 2222222222222222,
      cvv: 455,
      month: 12,
      year: 32,
      owner: 'PETR ROMANOV',
    },
    {
      cardNumber: 5555555555555555,
      cvv: 555,
      month: 5,
      year: 24,
      owner: 'ARCADY PETROV',
    },
  ];

  return (
    <>
      <div className={styles.wrapperProfilePage}>
        <FormProfile />
        <StackCards cards={cards} />
      </div>
    </>
  );
}

export default ProfilePage;
