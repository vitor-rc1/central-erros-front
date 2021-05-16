import React, { useState } from 'react';
import PopUpCreatedAccount from './PopUpCreatedAccount';
import Loading from '../loading.gif';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [erros, setErros] = useState({});
  const [registerState, setRegisterState] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    setRegisterState('loading');
    setErros({});
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
      body: JSON.stringify(loginObject),
    })
      .then((response) => response.text())
      .then((json) => {
        console.log(json);
        if (json === 'Usuário cadastrado com sucesso') return setRegisterState('created');
        setRegisterState('');
        return setErros(json);
      });
  };

  switch (registerState) {
    case 'created':
      return <PopUpCreatedAccount />;
    case 'loading':
      return <img src={Loading} alt="loading" />;
    default:
      return (
        <form onSubmit={submitLogin}>
          <label htmlFor="name">
            Nome:
            <input
              className={erros.name && 'wrong'}
              onChange={({ target }) => setName(target.value)}
              type="text"
              name="name"
              id="name"
              value={name}
              required
            />
          </label>
          <label htmlFor="login">
            Email:
            <input
              onClick={() => setErros({})}
              className={erros.login && 'wrong'}
              onChange={({ target }) => setEmail(target.value)}
              type="text"
              name="login"
              id="login"
              value={email}
            />
            {erros.login && <p>Email já cadastrado</p>}
          </label>
          <label htmlFor="password">
            Senha:
            <input
              className={erros.password && 'wrong'}
              onChange={({ target }) => setPassword(target.value)}
              type="password"
              name="password"
              id="password"
              value={password}
            />
          </label>
          <div className="button-container">
            <button type="submit">Cadastrar-se</button>
          </div>
        </form>
      );
  }
}

export default RegisterForm;
