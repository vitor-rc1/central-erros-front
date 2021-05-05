import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import MakeTheirTomorrow from './pages/MakeTheirTomorrowFalseLoading';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Switch>
      <Route exatch path="/register" component={Register} />
      <Route exatch path="/login" component={Login} />
      <Route exatch path="/dashboard" component={Dashboard} />
      <Route exatch path="/" component={MakeTheirTomorrow} />
    </Switch>
  );
}

export default App;
