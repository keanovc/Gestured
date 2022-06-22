import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
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
import LeaderboardLayout from './Leaderboard/LeaderboardLayout';

function App() {
  return (
    // <div className="app h-screen bg-auto bg-no-repeat bg-center bg-gray-100">
      <Router>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset" element={<Reset />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/modes">
              <Route index element={<Modes />} />
              <Route path="/modes/localcam" element={<LocalCam />} />
              <Route path="/modes/multiplayer" element={<Multiplayer />} />
              <Route path="/modes/localbuttons" element={<LocalButtons />} />
            </Route>
            <Route path="/leaderboard" element={<LeaderboardLayout />} >
              <Route index element={<Navigate to={'/leaderboard/buttons'} />} />
              <Route path="/leaderboard/:mode" element={<Leaderboard />} />
            </Route>
          </Routes>
        </AppContextProvider>
      </Router>
    // </div>
  );
}

export default App;
