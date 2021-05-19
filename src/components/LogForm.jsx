import React, { useState } from 'react';
import PopUpCreatedAccount from './PopUpCreatedAccount';
import Loading from '../loading.gif';
import convertDateTime from '../helpers/convertDateTime';

function RegisterForm() {
  const [description, setDescription] = useState('');
  const [erros, setErros] = useState({});
  const [level, setLevel] = useState('');
  const [registerState, setRegisterState] = useState('');
  const [source, setSource] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [eventLog, setEventLog] = useState('');
  const [date, setDate] = useState('');

  const submitLogin = (e) => {
    e.preventDefault();
    setRegisterState('loading');
    setErros({});
    const convertedDate = convertDateTime(date);
    const loggerObject = {
      level,
      description,
      source,
      quantity,
      eventLog,
      convertedDate,
    };

    console.log(loggerObject);
    // fetch('https://centraldeerrosjava.herokuapp.com/loggers', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(loginObject),
    // })
    //   .then((response) => response.text())
    //   .then((json) => {
    //     console.log(json);
    //     if (json === 'Usuário cadastrado com sucesso') return setRegisterState('created');
    //     setRegisterState('');
    //     return setErros(json);
    //   });
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
            Level
            <select
              value={level}
              onChange={({ target }) => setLevel(target.value)}
              id="level"
              type="level"
              required
            >
              <option hidden>
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
              required
            />
          </label>
          <label htmlFor="source">
            Origem:
            <input
              className={erros.source && 'wrong'}
              onChange={({ target }) => setSource(target.value)}
              type="text"
              name="source"
              id="source"
              value={source}
              required
            />
          </label>

          <label htmlFor="quantity">
            Quantidade:
            <input
              className={erros.quantity && 'wrong'}
              onChange={({ target }) => setQuantity(target.value)}
              type="number"
              name="quantity"
              id="quantity"
              value={quantity}
              required
            />
          </label>

          <label htmlFor="eventLog">
            Log
            <textarea
              onClick={() => setErros({})}
              className={erros.eventLog && 'wrong'}
              onChange={({ target }) => setEventLog(target.value)}
              name="eventLog"
              id="eventLog"
              value={eventLog}
              required
            />
          </label>

          <label htmlFor="date">
            Data:
            <input
              className={erros.date && 'wrong'}
              onChange={({ target }) => setDate(target.value)}
              type="datetime-local"
              name="date"
              id="date"
              value={date}
              required
            />
          </label>

          <div className="button-container">
            <button type="submit">Criar log</button>
          </div>
        </form>
      );
  }
}

export default RegisterForm;
