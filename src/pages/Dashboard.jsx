import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { isAuthenticated } from '../service/Auth';
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);
  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated[1]) {
      setRedirect(!authenticated[1]);
      return setLoading(false);
    }
    setLoading(false);
    return setRedirect(!authenticated[1]);
  }, []);
  if (loading) return <MakeTheirTomorrow />;
  if (redirect) return <Redirect to="/" />;
  return (
    <div>
      <h1>DashBoard</h1>
    </div>
  );
}

export default Dashboard;
