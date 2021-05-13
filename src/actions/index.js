/* eslint-disable import/prefer-default-export */
const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';
const VIEW_LOG = 'VIEW_LOG';
const LOADING = 'LOADING';
const OK = 'OK';
const CLOSE_LOG = 'CLOSE_LOG';
const RECENT_REQUEST_URL = 'RECENT_REQUEST_URL';

export const storageAllLoggers = (value) => ({
  type: STORAGE_ALL_LOGGERS,
  value,
});

export const closeLog = () => ({
  type: CLOSE_LOG,
});

export const recentUrl = (value) => ({
  type: RECENT_REQUEST_URL,
  value,
});

export const viewLog = (value) => async (dispatch) => {
  await dispatch({ type: LOADING });
  const Authorization = localStorage.getItem('Authorization') || '';
  fetch(`https://centraldeerrosjava.herokuapp.com/loggers/${value}`, {
    method: 'GET',
    headers: {
      authorization: Authorization,
    },
  })
    .then((result) => result.text())
    .then((log) => dispatch({ type: VIEW_LOG, value: [true, log] }))
    .then(dispatch({ type: OK }));
};
