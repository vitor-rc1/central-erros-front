/* eslint-disable import/prefer-default-export */
export const CreateLog = async (newLog) => {
  const URL = window.env.REACT_APP_URL;
  const loggersURL = `${URL}/loggers`;
  const authorization = localStorage.getItem('Authorization') || '';

  const createResponse = await fetch(loggersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${authorization}`,
    },
    body: JSON.stringify(newLog),
  });

  const { status } = createResponse;
  if (status !== 201) {
    const errorMessage = await createResponse.json();
    console.log(errorMessage);
    return errorMessage;
  }
  return 'created';
};
