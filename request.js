import fetch from 'node-fetch';

const makeRequest = async (baseURL, token, updatedData) => {
  const params = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: token
    },
    body: JSON.stringify(updatedData)
  };

  const response = await fetch(`${baseURL}/users/@me/settings`, params);
  if (!response.ok) throw new Error(response.status);
  const data = await response.json();
  console.log(data.custom_status.text);
};

export default makeRequest;
