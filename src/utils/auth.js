export const BASE_URL = 'https://api.movies.tearsoprah.nomoredomains.rocks';

export const register = ({ name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Ошибка при регистрации');
      }
      return response.json();
    })
    .then((data) => {
      // Обработка успешного ответа после регистрации
      return data;
    })
    .catch((error) => {
      // Обработка ошибки регистрации
      throw error;
    });
};



