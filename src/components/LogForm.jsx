import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Loading from '../loading.gif';
import convertDateTime from '../helpers/convertDateTime';
import { CreateLog } from '../service/CreateLog';

function RegisterForm() {
  const [registerState, setRegisterState] = useState('');
  const [erros, setErros] = useState({});

  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('ERROR');
  const [source, setSource] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [eventLog, setEventLog] = useState('');
  const [date, setDate] = useState('');

  const submitLogin = async (e) => {
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
      date: convertedDate,
    };

    const response = await CreateLog(loggerObject);
    if (response === 'created') {
      setRegisterState('done');
    } else {
      setErros(response);
    }
  };

  useEffect(() => {
    if (registerState === 'done') {
      setTimeout(() => { setRegisterState('created'); }, 2000);
    }
  }, [registerState]);

  switch (registerState) {
    case 'done':
      return <FontAwesomeIcon icon={faCheckCircle} alt="done" size="5x" />;
    case 'created':
      return <Redirect to="/dashboard" />;
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
              <option defaultValue value="ERROR">ERROR</option>
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
              min="1"
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
