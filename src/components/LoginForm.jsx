import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../loading.gif';

function LoginForm({ setRedirect }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const loginObject = new URLSearchParams({
      username: email,
      password,
      grant_type: 'password',
      client_id: 'client_id',
      client_secret: 'client_secret',
    });
    fetch('https://centraldeerrosjava.herokuapp.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginObject,
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.access_token) {
          localStorage.setItem('Authorization', `Bearer ${json.access_token}`);
          setRedirect(true);
        }
      });
  };
  if (loading) return <img src={Loading} alt="loading" />;
  return (
    <form onSubmit={submitLogin}>
      <label htmlFor="email">
        Email:
        <input
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          name="email"
          id="name"
          required
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          name="password"
          id="password"
          required
        />
      </label>
      <p>Ainda não é cadastrado?</p>
      <Link to="/register">Registre-se aqui!</Link>
      <button type="submit">Login</button>
    </form>
  );
}

LoginForm.propTypes = {
  setRedirect: PropTypes.func.isRequired,
};

export default LoginForm;
