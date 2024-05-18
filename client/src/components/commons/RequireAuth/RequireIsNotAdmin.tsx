import { Navigate } from 'react-router-dom';
import { Context } from '../../../main';
import { useContext } from 'react';

function RequireIsNotAdmin({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const { store } = useContext(Context);

  if (store.user.email === 'admin@admin') {
    return <Navigate to="/admin/users" />;
  }

  return children;
}

export default RequireIsNotAdmin;
