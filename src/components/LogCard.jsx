import React from 'react';
import PropTypes from 'prop-types';

function LoggerCard({
  id,
  level,
  description,
  source,
  quantity,
  date,
}) {
  return (
    <tr>
      <td>{id}</td>
      <td>{level}</td>
      <td>{description}</td>
      <td>{source}</td>
      <td>{quantity}</td>
      <td>{date}</td>
    </tr>
  );
}

LoggerCard.propTypes = {
  id: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  source: PropTypes.string.isRequired,
  quantity: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default LoggerCard;
