import Game from './TicTacToe/Game'
import Home from './home'
import Valentine from './Valentine/App'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<Game />} />
        <Route path="/valentine" element={<Valentine />} />
      </Routes>
    </Router>
  );
}

export default App;
