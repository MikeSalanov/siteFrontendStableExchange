import styles from './AdminUsersPage.module.scss';

function AdminUsersPage(): JSX.Element {
  interface UserInterface {
    id: string;
    email: string;
  }

  const users: UserInterface[] = [
    {
      id: 'efeew334r4grgr4',
      email: 'aaaaa@mail.com',
    },
    {
      id: '1feFFF34r4grffgr4',
      email: 'aaaaa@mail.com',
    },
    {
      id: 'Efeew33efefgEEFE',
      email: 'ssssss@mail.com',
    },
    {
      id: 'Tfeew334efefefFE',
      email: 'dddddd@mail.com',
    },
    {
      id: 'Nfeew33efefef454',
      email: 'vvvvvvvv@mail.com',
    },
    {
      id: 'Gfeew334r4TTrefe',
      email: 'xxxxxxx@mail.com',
    },
  ];
  return (
    <>
      <h1 className="mt-20 text-2xl text-slate-300">Пользователи</h1>
      <div className={styles.wrapperUsersPage}>
        <table className={styles.tableUsers}>
          <thead className=' bg-zinc-500'>
            <tr className=' rounded-t-lg'>
              <th className=' rounded-tl-lg'>ID</th>
              <th>E-Mail</th>
              <th className=' rounded-tr-lg'>Удалить</th>
            </tr>
          </thead>{' '}
          {users.map((user) => (
            <tbody>
              <tr>
                <td>{user.id}</td>

                <td>{user.email}</td>
                <td>
                  <img
                    width={20}
                    src="../../../../delete-user.svg"
                    alt="delete"
                    className="hover:transform hover:scale-150 hover:cursor-pointer  active:transofrm active:scale-125 transition-transform"
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

export default AdminUsersPage;
