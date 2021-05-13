import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';

function FilterBar() {
  const [columnFilter, setColumnFilter] = useState('');
  const [filterText, setFilterText] = useState('');
  const [level, setLevel] = useState('ERROR');
  const Authorization = localStorage.getItem('Authorization') || '';
  const dispatch = useDispatch();
  const fetchFilter = (e) => {
    e.preventDefault();
    const customUrl = `https://centraldeerrosjava.herokuapp.com/loggers?filter=${columnFilter}&value=${filterText}`;
    fetch(
      customUrl,
      {
        method: 'GET',
        headers: {
          authorization: Authorization,
        },
      },
      [],
    )
      .then((resolve) => resolve.json())
      .then((json) => {
        if (json.error) return json;
        dispatch(Actions.recentUrl(customUrl));
        return dispatch(Actions.storageAllLoggers(json));
      })
      .catch((error) => console.log(error));
  };
  const textInput = (
    <input
      onChange={({ target }) => setFilterText(target.value)}
      id="text"
      type="text"
    />
  );

  const levelInput = (
    <select
      value={level}
      onChange={({ target }) => setLevel(target.value)}
      id="text"
      type="text"
    >
      <option default value="ERROR">ERROR</option>
      <option value="INFO">INFO</option>
      <option value="WARNING">WARNING</option>
    </select>
  );
  return (
    <form onSubmit={fetchFilter}>
      <label htmlFor="text">
        {columnFilter === 'level' ? levelInput : textInput}
      </label>
      <label htmlFor="filter">
        <select
          id="filter"
          value={columnFilter}
          onChange={({ target }) => setColumnFilter(target.value)}
        >
          <option value="date">Data</option>
          <option value="description">Descrição</option>
          <option value="source">Origem</option>
          <option value="quantity">Quantidade</option>
          <option value="level">Level</option>
        </select>
      </label>
      <button type="submit">Pesquisar</button>
    </form>
  );
}

export default FilterBar;
