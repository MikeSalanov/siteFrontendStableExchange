import { Navigate} from 'react-router-dom';
import { Context } from '../../../main';
import { useContext} from 'react';

function RequireIsAdmin({ children }: { children: JSX.Element }): JSX.Element {
  const { store } = useContext(Context);

  if (store.user.email !== 'admin@admin') {
    return <Navigate to="/" />;
  }

  return children;
}

export default RequireIsAdmin;
