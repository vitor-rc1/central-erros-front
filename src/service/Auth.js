/* eslint-disable import/prefer-default-export */

export const isAuthenticated = () => {
  const notEqualErrorResponse = 1;
  const Authorization = localStorage.getItem('Authorization') || '';
  return new Promise((resolve, reject) => {
    fetch(
      'https://centraldeerrosjava.herokuapp.com/loggers',
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
        if (json.error) return resolve([false]);
        return resolve(json[notEqualErrorResponse] ? [json, true] : [json, false]);
      })
      .catch((error) => reject(error));
  });
};
