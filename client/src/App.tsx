import MainPage from './components/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { useContext, useEffect } from 'react';
import { Context } from './main';
import { observer } from 'mobx-react-lite';
import Header from "./components/Header/Header.tsx";
import ExchangePage from './components/ExchangePage/ExchangePage';
import RegConfirmForm from './components/commons/RegConfirmForm/RegConfirmForm';
import WalletPage from './components/WalletPage/WalletPage';
import RequireIsAuth from './components/commons/RequireAuth/RequireIsAuth';
import RequireIsNotAuth from './components/commons/RequireAuth/RequireIsNotAuth';
import HistoryPage from './components/HistoryPage/HistoryPage';
import AdminUsersPage from './components/AdminUsersPage/AdminUsersPage';
import AdminExchangePage from './components/AdminExchangePage/AdminExchangePage';
import RequireIsNotAdmin from './components/commons/RequireAuth/RequireIsNotAdmin';
import RequireIsAdmin from './components/commons/RequireAuth/RequireIsAdmin';
import Footer from "./components/Footer/Footer.tsx";
import LoginForm from "./components/commons/LoginForm/LoginForm.tsx";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <RequireIsNotAdmin>
              <MainPage />
            </RequireIsNotAdmin>
          }
        />

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
              <LoginForm />
            </RequireIsNotAuth>
          }
        />

        <Route
          path="/customer-account/settings"
          element={
            <RequireIsAuth>
              <ProfilePage />
            </RequireIsAuth>
          }
        />

        <Route
          path="/exchange"
          element={
            <RequireIsAuth>
              <ExchangePage />
            </RequireIsAuth>
          }
        />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/customer-account/wallet" element={
          <RequireIsAuth>
            <WalletPage />
          </RequireIsAuth>
        } />
        <Route
          path="/customer-account/confirm-registration"
          element={<RegConfirmForm />}
        />
        <Route
          path="/customer-account/history"
          element={
            <RequireIsAuth>
              <HistoryPage />
            </RequireIsAuth>
          }
        />

        <Route
          path="/admin/users"
          element={
            <RequireIsAdmin>
              <AdminUsersPage />
            </RequireIsAdmin>
          }
        />

        <Route
          path="/admin/exchanges"
          element={
            <RequireIsAdmin>
              <AdminExchangePage />
            </RequireIsAdmin>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default observer(App);
