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

  getProfile(token) {
    const fullUrl = `${this._url}/users/me`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getCardList(token) {
    const fullUrl = `${this._url}/cards`;
    return fetch(fullUrl, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
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
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editProfile(name, about, token) {
    const fullUrl = `${this._url}/users/me`;
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({name: name, about: about})
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  editAvatar(link, token) {
    const fullUrl = `${this._url}/users/me/avatar`;
    return fetch(fullUrl, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify( {avatar: link})
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addCard(name, link, token) {
    // return this._sendPostRequest('cards', {name: name, link: link});
    const fullUrl = `${this._url}/cards`;
    return fetch(fullUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({name: name, link: link})
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  addLike(cardId, token) {
    // return this._sendPutRequest(`cards/likes/${cardId}`);
    const fullUrl = `${this._url}/cards/${cardId}/likes`;
    return fetch(fullUrl, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteLike(cardId, token) {
    // return this._sendDeleteRequest(`cards/likes/${cardId}`);
    const fullUrl = `${this._url}/cards/${cardId}/likes`;
    return fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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

  deleteCard(cardId, token) {
    // return this._sendDeleteRequest(`cards/${cardId}`);
    const fullUrl = `${this._url}/cards/${cardId}`;
    return fetch(fullUrl, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    }).then((res) => {
      if(res.ok) {
        const result = res.json();
        return result;
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

}

const api = new Api(apiConfig);

export default api;
