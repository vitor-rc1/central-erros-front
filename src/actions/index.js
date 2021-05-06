/* eslint-disable import/prefer-default-export */
const STORAGE_ALL_LOGGERS = 'STORAGE_ALL_LOGGERS';

export const storageAllLoggers = (value) => ({
  type: STORAGE_ALL_LOGGERS,
  value,
});
