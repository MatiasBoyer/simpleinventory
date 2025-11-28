import './App.css';
import { Route, Routes } from 'react-router';
import Main from '@pages/main/main';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
    </Routes>
  );
}

export default App;
