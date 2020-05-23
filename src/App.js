import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainWeather from './components/MainWeather.js';

function App() {
  return (
    <div className="app">
      <header>
        <h1 className="app-title">Weather</h1>
      </header>
      
      <MainWeather />
      
    </div>
  );
}

export default App;
