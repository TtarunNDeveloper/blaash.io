import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './index.css';
import logo from './assets/logo.png';

const App = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleContinueClick = () => {
    setShowDashboard(true);
  };

  return (
    <div className="app h-screen w-screen flex">
      {showDashboard ? (
        <div className="flex h-full w-full">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <MainContent />
          </div>
        </div>
      ) : (
        <div className="welcome-screen flex items-center justify-center h-screen w-full">
          <div className="text-center">
            <img src={logo} alt='LOGO'/>
            <h1 className="text-4xl mb-4 text-gray-700">Welcome to Blaash</h1>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded" 
              onClick={handleContinueClick}
            >
              Click Here to Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
