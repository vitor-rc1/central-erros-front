import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login } from '../service/Login';
import Loading from '../loading.gif';

function LoginForm({ setRedirect }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loginObject = new URLSearchParams({
      username: email,
      password,
      grant_type: 'password',
      client_id: 'client_id',
      client_secret: 'client_secret',
    });

    const response = await Login(loginObject);
    if (response) {
      setRedirect(true);
    } else {
      alert('Login ou senha invalidos');
    }

    setLoading(false);
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
