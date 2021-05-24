import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import { isAuthenticated } from '../service/Auth';
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated) {
      setRedirect(true);
    }
    return setLoading(false);
  }, []);
  if (loading) return <MakeTheirTomorrow />;
  if (redirect) return <Redirect to="/dashboard" />;
  return (
    <section className="main-container">
      <Header />
      <div className="form-container">
        <LoginForm setRedirect={setRedirect} />
      </div>
    </section>
  );
}

export default Login;
