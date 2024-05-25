import { Link } from 'react-router-dom';
import styles from './DropDownProfile.module.scss';
import { MouseEventHandler } from 'react';

function DropDownItem({
  value,
  icon,
  route,
  onClick,
}: {
  value: string;
  icon: string;
  route: string;
  onClick: MouseEventHandler | undefined;
}): JSX.Element {
  return (
    <Link to={route}>
      <div className={styles.dropDownItem} onClick={onClick}>
        {' '}
        <img src={icon} alt={icon} /> <p>{value}</p>{' '}
      </div>{' '}
    </Link>
  );
}

export default DropDownItem;
