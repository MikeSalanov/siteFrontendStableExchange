import MainPage from './components/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import ExchangePage from './components/ExchangePage/ExchangePage';
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/customer-account/signUp" element={<RegisterPage />} />
        <Route path="/customer-account/signIn" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/exchange" element={<ExchangePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
