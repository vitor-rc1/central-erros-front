import React, { useState } from 'react';
import PopUpCreatedAccount from './PopUpCreatedAccount';
import Loading from '../loading.gif';
import { CreateUser } from '../service/CreateUser';

function LogForm() {
  const [email, setEmail] = useState('');
  const [erros, setErros] = useState({});
  const [registerState, setRegisterState] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const submitLogin = async (e) => {
    e.preventDefault();
    setRegisterState('loading');
    const newUser = {
      name,
      login: email,
      password,
    };
    const response = await CreateUser(newUser);
    console.log(response);
    if (response === 'created') {
      return setRegisterState('created');
    }
    setRegisterState('');
    return setErros(response);
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
            Nome
            <input
              className={erros.name && 'wrong'}
              onChange={({ target }) => setName(target.value)}
              type="text"
              name="name"
              id="name"
              value={name}
              required
            />
            {erros.name && <p>{erros.name}</p>}

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
              required
            />
            {erros.login && <p>{erros.login}</p>}
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
              required
            />
            {erros.password && <p>{erros.password}</p>}

          </label>
          <div className="button-container">
            <button type="submit">Cadastrar-se</button>
          </div>
        </form>
      );
  }
}

export default LogForm;
