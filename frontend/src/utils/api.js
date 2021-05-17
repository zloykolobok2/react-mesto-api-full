import { apiConfig } from './utils';

class Api {
  constructor(config) {
    this._url = config.url;
    if (localStorage.getItem('jwt')) {
      this._token = localStorage.getItem('jwt');
    }
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
        "Authorization": `Bearer ${this._token}`
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
        "Authorization": `Bearer ${this._token}`
      },
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        // console.log(result)
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  checkToken(token) {
    const fullUrl = `${this._url}/users/me`;
    console.log(fullUrl);
    return fetch(fullUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        console.log(result);
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editProfile(name, about) {
    const fullUrl = `${this._url}/users/me`;
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this._token}`
      },
      body: JSON.stringify({name: name, about: about})
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        // console.log(result)
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editAvatar(link) {
    const fullUrl = `${this._url}/users/me/avatar`;
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${this._token}`
      },
      body: JSON.stringify( {avatar: link})
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        // console.log(result)
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }
}

const api = new Api(apiConfig);

export default api;
