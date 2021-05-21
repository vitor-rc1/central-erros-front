import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions/index';
import convertDateTime from '../helpers/convertDateTime';

function FilterBar() {
  // const [columnFilter, setColumnFilter] = useState('');
  // const [filterText, setFilterText] = useState('');
  // const [dateStart, setDateStart] = useState('');
  // const [dateEnd, setDateEnd] = useState('');
  const [clear, setClear] = useState(false);
  const dispatch = useDispatch();

  const {
    filterBar: {
      column: columnFilter, value: filterText, dateStart, dateEnd,
    },
  } = useSelector((state) => state.loggers);

  const fetchFilter = () => {
    dispatch(Actions.setFilter({
      column: columnFilter,
      value: filterText,
    }));
    // ao fazer um novo filtro, volta a página para a primeira posição
    dispatch(Actions.currentPageLog(0));
  };

  useEffect(() => {
    if (columnFilter === 'date') {
      const date = `${convertDateTime(dateStart)}and${convertDateTime(dateEnd)}`;
      dispatch(Actions.setFilterBarValues({ value: date, column: 'value' }));
    }
  }, [dateEnd, dateStart]);

  const clearFilter = () => {
    dispatch(Actions.setFilterBarValues({ value: '', column: 'column' }));
    dispatch(Actions.setFilterBarValues({ value: '', column: 'value' }));
    dispatch(Actions.setFilterBarValues({ value: '', column: 'dateStart' }));
    dispatch(Actions.setFilterBarValues({ value: '', column: 'dateEnd' }));
    setClear(true);
  };

  useEffect(() => {
    if (clear && !filterText && !columnFilter) {
      fetchFilter();
    }
  }, [clear, filterText, columnFilter]);

  const textInput = (
    <>
      Valor
      <input
        onChange={({ target }) => dispatch(Actions.setFilterBarValues({ value: target.value, column: 'value' }))}
        value={filterText}
        id="text"
        type="text"
      />
    </>
  );

  const numberInput = (
    <>
      Valor
      <input
        onChange={({ target }) => dispatch(Actions.setFilterBarValues({ value: target.value, column: 'value' }))}
        value={filterText}
        id="text"
        type="number"
        min="1"
      />
    </>
  );

  const levelInput = (
    <>
      Valor
      <select
        value={filterText}
        onChange={({ target }) => dispatch(Actions.setFilterBarValues({ value: target.value, column: 'value' }))}
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
        onChange={({ target }) => dispatch(Actions.setFilterBarValues({ value: target.value, column: 'dateStart' }))}
        type="datetime-local"
        name="date"
        id="date"
        value={dateStart}
        required
      />
      Fim
      <input
        onChange={({ target }) => dispatch(Actions.setFilterBarValues({ value: target.value, column: 'dateEnd' }))}
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
      case 'id':
        return numberInput;
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
          onChange={({ target }) => dispatch(Actions.setFilterBarValues({ value: target.value, column: 'column' }))}
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
