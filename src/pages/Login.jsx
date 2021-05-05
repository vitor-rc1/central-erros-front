import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import MakeTheirTomorrow from './MakeTheirTomorrowLoading';

function Login() {
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const notEqualErrorResponse = 1;
    const Authorization = localStorage.getItem('Authorization') || '';
    fetch('https://centraldeerrosjava.herokuapp.com/loggers', {
      method: 'GET',
      headers: {
        authorization: Authorization,
      },
    }, [])
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        return json[notEqualErrorResponse]
          ? setRedirect(true)
          : setRedirect(false);
      });
  });
  if (loading) return <MakeTheirTomorrow />;
  if (redirect) return <Redirect to="/dashboard" />;
  return (
    <section className="main-container">
      <Header />
      <div className="form-container">
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
