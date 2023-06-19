import { BASE_URL } from "./constants";

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

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then((response => getResponseData(response)))
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
};

export const checkToken = (token) => {
  // отправки запроса на сервер для проверки токена
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => data)
};


