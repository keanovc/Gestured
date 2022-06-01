import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import Reset from './Reset/Reset';
import Dashboard from './Dashboard/Dashboard';
import Game from './Game/Game';
import { Leaderboard } from './Leaderboard/Leaderboard';

function App() {
  return (
    <div className="app h-screen bg-gradient-to-tl from-[#EE7A6E] to-[#8D5EF0]">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
