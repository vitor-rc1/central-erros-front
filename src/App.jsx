import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateLog from './pages/CreateLog';

function App() {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/createLog" component={CreateLog} />
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
