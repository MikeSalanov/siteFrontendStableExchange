import Header from '../Header/Header';
import styles from './ProfilePage.module.scss';
function ProfilePage(): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.wrapperProfilePage}>Profile Page</div>
    </>
  );
}

export default ProfilePage;
