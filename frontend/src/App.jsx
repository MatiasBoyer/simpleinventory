import './App.css';
import { Route, Routes } from 'react-router';
import Main from '@pages/main/main';
import CleanClassnames from './utils/functions/CleanClassnames';
import Inventory from './pages/inv/Inventory';
import PopupDisplayer from './components/organisms/Popup/PopupDisplayer';

function App() {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={CleanClassnames(`
        relative
        h-screen
        w-full md:w-[30%] md:max-w-[30%]
        border
        `)}
      >
        <PopupDisplayer />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
