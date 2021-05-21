import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import * as Actions from '../actions/index';
import LogCard from './LogCard';
import convertedDateTime from '../helpers/convertDateTime';

function LogList({ loggers }) {
  const dispatch = useDispatch();

  const {
    ordenation: { column, order },
  } = useSelector((state) => state.loggers);

  const orderBy = (value) => {
    let orderColumn = 'desc';
    if (value === column && order === 'desc') {
      orderColumn = 'asc';
    }
    dispatch(Actions.orderByColumn({ column: value, order: orderColumn }));
  };

  return (
    <table className="table-container">
      <thead>
        <th>
          <button
            type="button"
            name="id"
            onClick={({ target }) => orderBy(target.name)}
          >
            ID
          </button>
        </th>
        <th>
          <button
            type="button"
            name="level"
            onClick={({ target }) => orderBy(target.name)}
          >
            Level
          </button>
        </th>
        <th>
          <button
            type="button"
            name="description"
            onClick={({ target }) => orderBy(target.name)}
          >
            Descrição
          </button>
        </th>
        <th>
          <button
            type="button"
            name="source"
            onClick={({ target }) => orderBy(target.name)}
          >
            Origem
          </button>
        </th>
        <th>
          <button
            type="button"
            name="quantity"
            onClick={({ target }) => orderBy(target.name)}
          >
            Quantidade
          </button>
        </th>
        <th>
          <button
            type="button"
            name="date"
            onClick={({ target }) => orderBy(target.name)}
          >
            Data
          </button>
        </th>
      </thead>
      <tbody>
        {loggers.map(
          ({
            id, level, description, source, quantity, date,
          }) => (
            <LogCard
              key={id}
              id={id}
              level={level}
              description={description}
              source={source}
              quantity={quantity}
              date={convertedDateTime(date)}
            />
          ),
        )}
      </tbody>
    </table>
  );
}

LogList.propTypes = {
  loggers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      level: PropTypes.string,
      description: PropTypes.string,
      eventLog: PropTypes.string,
      source: PropTypes.string,
      quantity: PropTypes.string,
      date: PropTypes.string,
    }),
  ).isRequired,
};
export default LogList;
