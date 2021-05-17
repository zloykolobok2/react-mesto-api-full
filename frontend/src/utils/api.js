import { apiConfig } from './utils';

class Api {
  constructor(config) {
    this._url = config.url;
  }

  register({email, password}) {
    const fullUrl = `${this._url}/signup`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    }).then((res) => {
      // return this._check(res);
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  login({email, password}) {
    const fullUrl = `${this._url}/signin`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getProfile() {
    const fullUrl = `${this._url}/users/me`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getCardList() {
    const fullUrl = `${this._url}/cards`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }


}

const api = new Api(apiConfig);

export default api;
