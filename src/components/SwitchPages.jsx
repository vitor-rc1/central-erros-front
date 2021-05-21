import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions/index';

function SwitchPages() {
  const { pageLog: { totalPages } } = useSelector((state) => state.loggers);
  const dispatch = useDispatch();
  const setPageData = (number) => dispatch(Actions.currentPageLog(number));
  const pageButton = () => {
    const buttons = [];

    for (let count = 1; count <= totalPages; count += 1) {
      buttons.push(
        <button onClick={() => setPageData(Number(count) - 1)} type="button">
          {count}
        </button>,
      );
    }
    return buttons;
  };

  return <div className="page-list">{pageButton().map((page) => page)}</div>;
}

export default SwitchPages;
