import { apiConfig, AUTH_LINK } from './utils';

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authUrl = AUTH_LINK;
  }

  _check(res) {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _sendGetRequest(url) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendPatchRequest(url, data) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendPostRequest(url, data) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendDeleteRequest(url) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => {
      return this._check(res);
    })
  }

  _sendPutRequest(url) {
    const fullUrl = `${this._url}/${url}`;
    return fetch(fullUrl, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => {
      return this._check(res);
    })
  }

  getCardList() {
    return this._sendGetRequest('cards');
  }

  getProfile() {
    return this._sendGetRequest('users/me');
  }

  editProfile(name, about) {
    return this._sendPatchRequest('users/me', {name: name, about: about});
  }

  addCard(name, link) {
    return this._sendPostRequest('cards', {name: name, link: link});
  }

  deleteCard(cardId) {
    return this._sendDeleteRequest(`cards/${cardId}`);
  }

  addLike(cardId) {
    return this._sendPutRequest(`cards/likes/${cardId}`);
  }

  deleteLike(cardId) {
    return this._sendDeleteRequest(`cards/likes/${cardId}`);
  }

  editAvatar(link) {
    return this._sendPatchRequest('users/me/avatar', {avatar: link});
  }

  register({email, password}) {
    const fullUrl = `${this._authUrl}/signup`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email, password})
    }).then((res) => {
      return this._check(res);
    })
  }

  checkToken(token) {
    const fullUrl = `${this._authUrl}/users/me`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      },
    }).then((res) => {
      return this._check(res);
    })
  }

  login({email, password}) {
    const fullUrl = `${this._authUrl}/signin`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password})
    }).then((res) => {
      return this._check(res);
    })
  }

}

const api = new Api(apiConfig);

export default api;
