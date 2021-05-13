import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';

function FilterBar() {
  const [columnFilter, setColumnFilter] = useState('');
  const [filterText, setFilterText] = useState('');
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
      .then((resolve) => {
        if (resolve.status === 500) throw new Error('Enum error!?');
        return resolve.json();
      })
      .then((json) => {
        dispatch(Actions.recentUrl(customUrl));
        dispatch(Actions.storageAllLoggers(json));
      })
      .catch((error) => console.log(error));
  };
  return (
    <form onSubmit={fetchFilter}>
      <label htmlFor="text">
        <input
          onChange={({ target }) => setFilterText(target.value)}
          id="text"
          type="text"
        />
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
