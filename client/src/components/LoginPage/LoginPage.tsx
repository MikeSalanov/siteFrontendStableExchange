import styles from './LoginPage.module.scss';
import Header from '../Header/Header';
function LoginPage(): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.wrapperLoginPage}>Login Page</div>
    </>
  );
}

export default LoginPage;
