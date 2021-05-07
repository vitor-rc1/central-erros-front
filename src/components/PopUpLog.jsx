import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import * as Actions from '../actions/index';
import Loading from '../loading.gif';

function PopUpLog({ log, loading }) {
  const dispatch = useDispatch();
  if (loading) {
    return (
      <div className="log-container">
        <img src={Loading} alt="loading" />
      </div>
    );
  }
  return (
    <div className="log-container">
      <div className="flex my-auto flex-col items-center">
        <button className="m-2" type="button" onClick={() => dispatch(Actions.closeLog())}>
          X
        </button>
        <h1>Log</h1>
      </div>

      <p>{log}</p>
    </div>
  );
}

PopUpLog.propTypes = {
  log: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default PopUpLog;
