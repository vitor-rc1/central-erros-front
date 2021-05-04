import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    const loginObject = new URLSearchParams({
      username: email,
      password,
      grant_type: 'password',
      client_id: 'client_id',
      client_secret: 'client_secret',
    });
    fetch('http://localhost:8080/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginObject,
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  return (
    <form onSubmit={submitLogin}>
      <label htmlFor="email">
        Email:
        <input
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          name="email"
          id="name"
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          name="password"
          id="password"
        />
      </label>
      <p>Ainda não é cadastrado?</p>
      <Link to="/register">Registre-se aqui!</Link>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
