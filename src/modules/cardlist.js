import Card from './card.js';
import {cardsBox} from './variable.js';
export default class CardList {
    constructor(container, array) {
      this.container = container;
      this.array = array;
      this.render(array);
    }
    addCard(event) {
      event.preventDefault();
      const nameUser = formAdd.elements.name.value;
      const linkUser = formAdd.elements.link.value;
      const { cardElement } = new Card(nameUser, linkUser);
  
      cardsBox.insertAdjacentHTML("beforeend", cardElement);
      popupSwitch();
      formNone();
    }
    render(array) {
      array.forEach(function(item) {
        const { cardElement } = new Card(item.name, item.link);
        cardsBox.insertAdjacentHTML("beforeend", cardElement);
      });
    }
  }