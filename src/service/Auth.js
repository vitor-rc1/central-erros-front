/* eslint-disable import/prefer-default-export */
import base64 from 'base-64';

export const isAuthenticated = async () => {
  const authorization = localStorage.getItem('Authorization') || '';
  const URL = window.env.REACT_APP_URL;
  const verifyURL = `${URL}/oauth/check_token?token=${authorization}`;

  const headers = new Headers();
  headers.append('Authorization', `Basic ${base64.encode('client_id:client_secret')}`);

  const validationToken = await fetch(verifyURL, {
    method: 'GET',
    headers,
  });

  const { status } = validationToken;
  if (status !== 200) return false;
  return true;
};
