import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../actions/index';

function SwitchPages() {
  const [page, setPage] = useState(0);
  const Authorization = localStorage.getItem('Authorization') || '';
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.loggers);

  useEffect(() => {
    fetch(
      `${url}${url.length === 48 ? '?' : '&'}page=${page}&limit=6`,
      {
        method: 'GET',
        headers: {
          authorization: Authorization,
        },
      },
      [],
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch(Actions.storageAllLoggers(json));
      });
  }, [page]);
  return (
    <div>
      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 0}
        type="button"
      >
        {'<-'}
      </button>
      <button onClick={() => setPage(page + 1)} type="button">
        {'->'}
      </button>
    </div>
  );
}

export default SwitchPages;
