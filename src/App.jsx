import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exatch path="/register" component={Register} />
      <Route exatch path="/" component={Login} />
    </Switch>
  );
}

export default App;
