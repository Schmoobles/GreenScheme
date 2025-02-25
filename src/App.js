import React from 'react';
import AddPlant from './components/AddPlant';
import logo from './assets/logo.png';
import './App.css';

function App() {
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