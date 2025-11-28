import './App.css';
import { Route, Routes } from 'react-router';
import Main from '@pages/main/main';
import CleanClassnames from './utils/functions/CleanClassnames';

function App() {
  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={CleanClassnames(`
        h-screen
        w-full md:w-[30%] md:max-w-[30%]
        bg-stone-100
        `)}
      >
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
