import {cardsBox} from './variable';

export default class Card {
    constructor(name, link) {
      this.cardElement = this.getCard(name, link);
    }
    getCard(name, link) {
  
      return `<div class="place-card">
            <div class="place-card__image" style="background-image: url(${link})">
              <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
              <h3 class="place-card__name">${name}</h3>
              <button class="place-card__like-icon"></button>
            </div>
          </div>`.trim();
    }
  
    likeDell(event) {
      if (event.target.classList.contains("place-card__like-icon")) {
        event.target.classList.toggle("place-card__like-icon_liked");
      } else if (event.target.classList.contains("place-card__delete-icon")) {
        cardsBox.removeChild(event.target.parentElement.parentElement);
      }
    }
  }