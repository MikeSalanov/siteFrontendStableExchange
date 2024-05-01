import { Link } from 'react-router-dom';
import styles from './Header.module.scss'
function Header(): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <Link to="/">Home</Link>
      <Link to="/register">Sign up</Link>
      <Link to="/login">Sign in</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Header;