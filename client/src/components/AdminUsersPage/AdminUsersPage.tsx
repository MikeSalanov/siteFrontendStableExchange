import { useContext, useEffect, useState } from 'react';
import styles from './AdminUsersPage.module.scss';
import { observer } from 'mobx-react-lite';
import { Context } from '../../main';
import { UsersResponse } from '../../models/response/UsersResponse';
import { Link } from 'react-router-dom';
import DeleteUserSVG from '../../../public/delete-user.svg';

function AdminUsersPage(): JSX.Element {
  const [users, setUsers] = useState<UsersResponse[] | undefined>([]);

  const { store } = useContext(Context);

  useEffect(() => {
    store.getUsers().then((res) => setUsers(res));
  }, [store]);

  const deleteUserHandler = async (id: string) => {
    const response = await store.adminDeleteUser(id);
    if (response) {
      setUsers((prev) => prev?.filter((user) => user.id !== response.id));
    }
  };

  return (
    <>
      <h1 className="mt-20 text-2xl text-slate-300">Пользователи</h1>
      <div><Link to="/admin/exchanges">Транзакции</Link> <div  onClick={store.logout}>Выйти</div></div>
      <div className={styles.wrapperUsersPage}>
        <table className={styles.tableUsers}>
          <thead className=" bg-zinc-500">
            <tr className=" rounded-t-lg">
              <th className=" rounded-tl-lg">ID</th>
              <th>E-Mail</th>
              <th className=" rounded-tr-lg">Удалить</th>
            </tr>
          </thead>{' '}
          {users?.map((user) => (
            <tbody>
              <tr>
                <td>{user.id}</td>

                <td>{user.email}</td>
                <td>
                  <img
                    width={20}
                    src={DeleteUserSVG}
                    alt="delete"
                    className="hover:transform hover:scale-150 hover:cursor-pointer  active:transofrm active:scale-125 transition-transform"
                    onClick={() => {
                      deleteUserHandler(user.id);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </>
  );
}

export default observer(AdminUsersPage);
