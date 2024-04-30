import MainPage from './components/MainPage/MainPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
