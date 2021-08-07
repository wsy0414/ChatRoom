import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from './page/login/Login';
import { RootRouter } from './router/RootRouter';

function App() {
  return (
    <div className="App">
      <RootRouter/>
    </div>
  );
}

export default App;
