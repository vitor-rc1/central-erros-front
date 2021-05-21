import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';
import convertDateTime from '../helpers/convertDateTime';

function FilterBar() {
  const [columnFilter, setColumnFilter] = useState('');
  const [filterText, setFilterText] = useState('');
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();
  const fetchFilter = () => {
    dispatch(Actions.setFilter({
      column: columnFilter,
      value: filterText,
    }));
    dispatch(Actions.currentPageLog(0));
  };

  useEffect(() => {
    if (columnFilter === 'date') {
      const date = `${convertDateTime(dateStart)}and${convertDateTime(dateEnd)}`;
      setFilterText(date);
    }
  }, [dateEnd, dateStart]);

  const clearFilter = () => {
    setFilterText('');
    setColumnFilter('');
    setDateStart('');
    setDateEnd('');
    setClear(true);
  };

  useEffect(() => {
    if (clear && !filterText && !columnFilter) {
      fetchFilter(true);
    }
  }, [clear, filterText, columnFilter]);

  const textInput = (
    <>
      Valor
      <input
        onChange={({ target }) => setFilterText(target.value)}
        value={filterText}
        id="text"
        type="text"
      />
    </>
  );

  const levelInput = (
    <>
      Valor
      <select
        value={filterText}
        onChange={({ target }) => setFilterText(target.value)}
        id="text"
      >
        <option hidden>...</option>
        <option default value="ERROR">
          ERROR
        </option>
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
      </select>
    </>
  );

  const dateInput = (
    <>
      Inicio
      <input
        onChange={({ target }) => setDateStart(target.value)}
        type="datetime-local"
        name="date"
        id="date"
        value={dateStart}
        required
      />
      Fim
      <input
        onChange={({ target }) => setDateEnd(target.value)}
        type="datetime-local"
        name="date"
        id="date"
        value={dateEnd}
        required
      />
    </>
  );

  const selectInput = (colFilter) => {
    switch (colFilter) {
      case 'level':
        return levelInput;
      case 'date':
        return dateInput;
      default:
        return textInput;
    }
  };

  return (
    <form className="filter-form-container">
      <label htmlFor="filter">
        Filtrar por:
        <select
          id="filter"
          value={columnFilter}
          onChange={({ target }) => setColumnFilter(target.value)}
        >
          <option hidden>...</option>
          <option value="date">Data</option>
          <option value="description">Descrição</option>
          <option value="source">Origem</option>
          <option value="quantity">Quantidade</option>
          <option value="level">Level</option>
          <option value="id">Id</option>
        </select>
      </label>
      <label htmlFor="text">
        {selectInput(columnFilter)}
      </label>
      <button type="button" onClick={fetchFilter}>Pesquisar</button>
      <button type="button" onClick={clearFilter}>Limpar</button>
    </form>
  );
}

export default FilterBar;
