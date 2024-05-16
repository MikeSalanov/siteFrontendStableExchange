import MainPage from './components/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage';

import { useContext, useEffect } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import ExchangePage from './components/ExchangePage/ExchangePage';
import RegConfirmForm from './components/commons/RegConfirmForm/RegConfirmForm';
import WalletPage from './components/WalletPage/WalletPage';
import RequireIsAuth from './components/commons/RequireAuth/RequireIsAuth';
import RequireIsNotAuth from './components/commons/RequireAuth/RequireIsNotAuth';

function App(): JSX.Element {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />

        <Route
          path="/customer-account/signUp"
          element={
            <RequireIsNotAuth>
              <RegisterPage />
            </RequireIsNotAuth>
          }
        />
        <Route
          path="/customer-account/signIn"
          element={
            <RequireIsNotAuth>
              <LoginPage />
            </RequireIsNotAuth>
          }
        />

        <Route path="/profile" element={<ProfilePage />} />

        <Route
          path="/exchange"
          element={
            <RequireIsAuth>
              <ExchangePage />
            </RequireIsAuth>
          }
        />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/customer-account/wallet" element={< WalletPage/>} />
        <Route path="/customer-account/confirm-registration" element={< RegConfirmForm/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default observer(App);
