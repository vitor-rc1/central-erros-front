/* eslint-disable import/prefer-default-export */
export const Login = async (loginObject) => {
  const URL = window.env.REACT_APP_URL;
  const verifyURL = `${URL}/oauth/token`;

  const loginResponse = await fetch(verifyURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: loginObject,
  });

  const { status } = loginResponse;
  if (status !== 200) return false;

  const jsonResponse = await loginResponse.json();
  localStorage.setItem('Authorization', jsonResponse.access_token);

  return true;
};
