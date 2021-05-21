/* eslint-disable import/prefer-default-export */
import { URL } from '../service/URL.json';

const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';
const VIEW_LOG = 'VIEW_LOG';
const LOADING = 'LOADING';
const OK = 'OK';
const CLOSE_LOG = 'CLOSE_LOG';
const SHOW_MENU = 'SHOW_MENU';
const CURRENT_PAGE_LOG = 'CURRENT_PAGE_LOG';
const FILTER = 'FILTER';

export const storageAllLoggers = (value) => ({
  type: STORAGE_ALL_LOGGERS,
  value,
});

export const currentPageLog = (value) => ({
  type: CURRENT_PAGE_LOG,
  value,
});

export const closeLog = () => ({
  type: CLOSE_LOG,
});

export const showMenu = () => ({
  type: SHOW_MENU,
});

export const setFilter = (value) => ({
  type: FILTER,
  value,
});

export const viewLog = (value) => async (dispatch) => {
  await dispatch({ type: LOADING });
  const Authorization = localStorage.getItem('Authorization') || '';
  fetch(`${URL}/loggers/${value}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${Authorization}`,
    },
  })
    .then((result) => result.text())
    .then((log) => dispatch({ type: VIEW_LOG, value: [true, log] }))
    .then(dispatch({ type: OK }));
};
