import {config, cardsBox} from './variable.js';
import CardList from './cardlist'
import {renderLoading} from './helpers.js'

export class Api {
  constructor({ ip, /*id,*/ token, name, about }) {
    this.ip = ip;
    //this.id = id;
    this.token = token;
    this.name = name;
    this.about = about; 
  }

  getUserId() {
    return ( 
      fetch(`${this.ip}/users/me`, {
        method: "GET", 
        headers: {
          authorization: this.token,
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .catch(err => {
          console.log("Ошибка", err);
        })
    );
  }

  getInitialCards() {
    return fetch(`${this.ip}/cards`, {
      method: "GET",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
          
        }
        return Promise.reject(res.status);
      })
      .then(cards => {
        new CardList(cardsBox, cards);
      })
      .catch(err => {
        console.log("Ошибка", err);
      });
  }

  editProfile(name, about) {
    return (
      fetch(`${this.ip}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: this.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          about: about
          
        })
        
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .catch(err => {
          console.log("Ошибка", err);
        })
        .finally(function() {
          renderLoading(false);
        })
    );
  }
  postCard(name, link) {
    return fetch(`${this.ip}/cards`, {
      method: "POST",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then(res => console.log(res))

      .catch(err => console.log("Ошибка", err));
  }
}

export const api = new Api(config);
