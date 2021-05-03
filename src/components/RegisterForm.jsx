import React, { useState } from 'react';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    const loginObject = {
      name,
      login: email,
      password,
    };
    fetch('https://centraldeerrosjava.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: loginObject,
    });
  };
  return (
    <form onSubmit={submitLogin}>
      <label htmlFor="name">
        Nome:
        <input
          onChange={({ target }) => setName(target.value)}
          type="text"
          name="name"
          id="name"
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          onChange={({ target }) => setEmail(target.value)}
          type="text"
          name="email"
          id="email"
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
      <button type="submit">Cadastrar-se</button>
    </form>
  );
}

export default RegisterForm;
