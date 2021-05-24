/* eslint-disable import/prefer-default-export */
export const CreateUser = async (newUser) => {
  const URL = window.env.REACT_APP_URL;
  const usersURL = `${URL}/users`;

  const createResponse = await fetch(usersURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  });

  const { status } = createResponse;
  if (status !== 201) {
    const errorMessage = await createResponse.json();
    return errorMessage;
  }
  console.log(createResponse);
  return 'created';
};
