import { useNavigate } from 'react-router-dom';
import styles from './ButtonHome.module.scss';

function ButtonHome(): JSX.Element {
  const navigate = useNavigate();
  return (
    <>
      <div onClick={() => navigate('/')} className={styles.buttonHome}>
        <img src="home_icon.svg" alt="home_icon" />
      </div>
    </>
  );
}

export default ButtonHome;
