import React from 'react';
import PropTypes from 'prop-types';
import LogCard from './LogCard';
import convertedDateTime from '../helpers/convertDateTime';

function LogList({ loggers }) {
  return (
    <table className="table-container">
      <thead>
        <th>ID</th>
        <th>Level</th>
        <th>Descrição</th>
        <th>Origem</th>
        <th>Quantidade</th>
        <th>Data</th>
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
