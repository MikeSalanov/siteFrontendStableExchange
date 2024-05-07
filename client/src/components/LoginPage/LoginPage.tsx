import styles from './LoginPage.module.scss';
import Header from '../Header/Header';
import LoginForm from '../commons/LoginForm/LoginForm';
function LoginPage(): JSX.Element {
  return (
    <>
      <Header />
      {/* <div className={styles.wrapperLoginPage}>Login Page</div> */}
      <LoginForm/>
    </>
  );
}

export default LoginPage;
