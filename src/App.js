import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import Reset from './Reset/Reset';
import Dashboard from './Dashboard/Dashboard';
import LocalCam from './LocalCam/LocalCam';
import { Leaderboard } from './Leaderboard/Leaderboard';
import Modes from './Modes/Modes';
import LocalButtons from './LocalButtons/LocalButtons';
import { AppContextProvider } from './contexts/AppContext';
import Multiplayer from './LocalCam/multiplayer';

function App() {
  return (
    <div className="app h-screen bg-gradient-to-tl from-[#EE7A6E] to-[#8D5EF0]">
      <Router>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/modes" element={<Modes />} />
            <Route path="/modes/localcam" element={<LocalCam />} />
            <Route path="/modes/localbuttons" element={<LocalButtons />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/multiplayer" element={<Multiplayer />} />
          </Routes>
        </AppContextProvider>
      </Router>
    </div>
  );
}

export default App;
