import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions/index';

function SwitchPages() {
  const { allLoggers } = useSelector((state) => state.loggers);
  const dispatch = useDispatch();
  const setPageData = (number) => dispatch(Actions.currentPageLog(allLoggers[number - 1]));
  const pageButton = (number) => (
    <button onClick={() => setPageData(number)} type="button">
      {number}
    </button>
  );

  return <div className="page-list">{allLoggers.map((page, index) => pageButton(index + 1))}</div>;
}

export default SwitchPages;
