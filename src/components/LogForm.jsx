import React, { useState } from 'react';
import PopUpCreatedAccount from './PopUpCreatedAccount';
import Loading from '../loading.gif';

function RegisterForm() {
  const [description, setDescription] = useState('');
  const [erros, setErros] = useState({});
  const [level, setLevel] = useState('');
  const [registerState, setRegisterState] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    setRegisterState('loading');
    setErros({});
    const loginObject = {
      level,
      description,
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
          <label htmlFor="level">
            <select
              value={level}
              onChange={({ target }) => setLevel(target.value)}
              id="level"
              type="level"
            >
              <option default hidden>
                ...
              </option>
              <option value="ERROR">ERROR</option>
              <option value="INFO">INFO</option>
              <option value="WARNING">WARNING</option>
            </select>
          </label>
          <label htmlFor="description">
            Descrição
            <textarea
              onClick={() => setErros({})}
              className={erros.description && 'wrong'}
              onChange={({ target }) => setDescription(target.value)}
              name="description"
              id="description"
              value={description}
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
