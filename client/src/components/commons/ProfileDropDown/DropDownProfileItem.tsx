import { Link } from 'react-router-dom';
import styles from './DropDownProfile.module.scss';

function DropDownItem({ value, icon, route, onClick }): JSX.Element {



  return (
    <Link to={route}>
      <div className={styles.dropDownItem}>
        {' '}
        <img src={icon} alt={icon} /> <p onClick={onClick}>{value}</p>{' '}
      </div>{' '}
    </Link>
  );
}

export default DropDownItem;
