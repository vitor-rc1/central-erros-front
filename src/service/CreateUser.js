/* eslint-disable import/prefer-default-export */
import { URL } from './URL.json';

export const CreateUser = async (newUser) => {
  const verifyURL = `${URL}/users`;

  const createResponse = await fetch(verifyURL, {
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
