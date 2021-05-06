import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import * as Actions from '../actions/index';
import LoginForm from '../components/LoginForm';
import { isAuthenticated } from '../service/Auth';
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    const authenticated = await isAuthenticated();
    if (authenticated[1]) {
      dispatch(Actions.storageAllLoggers(authenticated[0]));
      setRedirect(authenticated[1]);
      return setLoading(false);
    }
    setLoading(false);
    return setRedirect(authenticated[0]);
  });
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
