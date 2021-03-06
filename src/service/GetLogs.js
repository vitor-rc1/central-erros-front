/* eslint-disable import/prefer-default-export */
export const GetLogs = async (filters) => {
  const {
    pageLog: { size, page },
    ordenation: { column, order },
    filter: { column: filterColumn, value },
  } = filters;
  const setFilter = !filterColumn && !value ? '' : `&filter=${filterColumn}&value=${value}`;
  const URL = window.env.REACT_APP_URL;
  const verifyURL = `${URL}/loggers?page=${page}&size=${size}&sort=${column},${order}${setFilter}`;
  const authorization = localStorage.getItem('Authorization') || '';

  const loginResponse = await fetch(verifyURL, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${authorization}`,
    },
  });

  const { status } = loginResponse;
  if (status !== 200) return false;

  const jsonResponse = await loginResponse.json();
  console.log(jsonResponse);
  return jsonResponse;
};
