export const BASE_URL = 'https://api.novoselov.nomoredomains.sbs';

const getResponseData = (res) => {
  if (res.ok) {
    return res.json();
  };
  return Promise.reject(res.statusText);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then((responce) => getResponseData(responce));
};

export const signin = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({password, email,})
  })
  .then((responce => getResponseData(responce)))
  .then((data) => {
    if (data.token){
      localStorage.setItem('token', data.token);
      return data;
    }
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`
    }
  })
  .then((responce => getResponseData(responce)))
  .then((res) => {
    if (res.email){
      return res;
    }
  });
};
