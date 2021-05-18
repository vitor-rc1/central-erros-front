import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';
import { pagenation } from '../service/Pagenation';

function FilterBar() {
  const [columnFilter, setColumnFilter] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterLevel, setFilterLevel] = useState('ERROR');
  const Authorization = localStorage.getItem('Authorization') || '';
  const dispatch = useDispatch();
  const fetchFilter = (e) => {
    e.preventDefault();
    const customUrl = `https://centraldeerrosjava.herokuapp.com/loggers?filter=${columnFilter}&value=${
      columnFilter === 'level' ? filterLevel : filterText
    }`;
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
        const arrayPageable = pagenation(json, 8);
        dispatch(Actions.currentPageLog(arrayPageable[0]));
        return dispatch(Actions.storageAllLoggers(arrayPageable));
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
      value={filterLevel}
      onChange={({ target }) => setFilterLevel(target.value)}
      id="text"
      type="text"
    >
      <option default value="ERROR">
        ERROR
      </option>
      <option value="INFO">INFO</option>
      <option value="WARNING">WARNING</option>
    </select>
  );
  return (
    <form className="filter-form-container" onSubmit={fetchFilter}>
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
