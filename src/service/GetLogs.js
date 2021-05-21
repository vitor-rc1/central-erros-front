import { URL } from './URL.json';

const GetLogs = async (filters) => {
  const {
    pageLog: { size, page },
    ordenation: { column, order },
  } = filters;
  const verifyURL = `${URL}/loggers?page=${page}&size=${size}&sort=${column},${order}`;
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

export default GetLogs;
