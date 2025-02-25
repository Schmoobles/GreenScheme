import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddPlant from './components/AddPlant';
import logo from './assets/logo.png';
import './App.css';


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate]);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Green Scheme Logo" className="logo" />
        <h2>🌱 Green Scheme - Your Garden Planner 🌿</h2>
      </header>
      <div style={{ padding: '20px' }}>
        <table><AddPlant /></table>
      </div>
    </div>
  );
}

export default App;