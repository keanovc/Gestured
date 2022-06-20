import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import Reset from './Reset/Reset';
import Dashboard from './Dashboard/Dashboard';
import LocalCam from './LocalCam/LocalCam';
import { Leaderboard } from './Leaderboard/Leaderboard';
<<<<<<< HEAD
import Multiplayer from './Game/multiplayer';
=======
import Modes from './Modes/Modes';
import LocalButtons from './LocalButtons/LocalButtons';
import { AppContextProvider } from './contexts/AppContext';
>>>>>>> 939ac314bfabb4e8faa3f62eccd09fad35acff68

function App() {
  return (
    <div className="app h-screen bg-gradient-to-tl from-[#EE7A6E] to-[#8D5EF0]">
      <Router>
<<<<<<< HEAD
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
        </Routes>
=======
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
          </Routes>
        </AppContextProvider>
>>>>>>> 939ac314bfabb4e8faa3f62eccd09fad35acff68
      </Router>
    </div>
  );
}

export default App;
