import Game from './TicTacToe/Game'
import Home from './home'

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/tictactoe" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
