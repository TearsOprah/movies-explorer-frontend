export const BASE_URL = 'https://api.movies.tearsoprah.nomoredomains.rocks';

// метод для проверки ответа сервера
const getResponseData = (res) => {
  if (!res.ok) {
    return Promise.reject(`${res.status}`);
  }
  return res.json();
}

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => getResponseData(response))
    .then((res) => {
      return res;
    })
};



