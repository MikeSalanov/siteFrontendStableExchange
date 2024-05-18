import { Navigate} from 'react-router-dom';
import { Context } from '../../../main';
import { useContext} from 'react';
import { observer } from 'mobx-react-lite';

function RequireIsAdmin({ children }: { children: JSX.Element }): JSX.Element {
  const { store } = useContext(Context);

  if (store.user.email !== 'admin@admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default observer(RequireIsAdmin);
