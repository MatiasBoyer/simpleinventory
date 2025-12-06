import './App.css';
import { Route, Routes } from 'react-router';
import Main from '@pages/main/main';
import CleanClassnames from './utils/functions/CleanClassnames';
import InventoryList from './pages/inventory/InventoryList';
import InventoryDisplay from './pages/inventory/InventoryDisplay';
import NotFound from './pages/errors/NotFound';
import Auth from './pages/auth/Auth';
import PopupDisplayer from './components/organisms/Popup/PopupDisplayer';
import InventoryImageAnalysis from './pages/ai/InventoryImageAnalysis';

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
          <Route path="/auth" element={<Auth />} />
          <Route path="/inventory">
            <Route path="/inventory/list" element={<InventoryList />} />
            <Route path="/inventory/display" element={<InventoryDisplay />} />
          </Route>
          <Route path="/ai">
            <Route
              path="/ai/inventory/imageanalysis"
              element={<InventoryImageAnalysis />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
