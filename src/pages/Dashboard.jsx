import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LogList from '../components/LogList';
import { isAuthenticated } from '../service/Auth';
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [loggers, setLoggers] = useState([]);
  const [redirect, setRedirect] = useState(false);
  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated[1]) {
      setLoggers(authenticated[0]);
      setRedirect(!authenticated[1]);
      return setLoading(false);
    }
    setLoading(false);
    return setRedirect(!authenticated[1]);
  }, []);
  if (loading) return <MakeTheirTomorrow />;
  if (redirect) return <Redirect to="/" />;
  return (
    <div className="main-container">
      <Header />
      <LogList loggers={loggers} />
    </div>
  );
}

export default Dashboard;
