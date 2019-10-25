import {cardsBox} from './variable.js'

class PopupImg {
    constructor(container) {
      this.container = container;
  
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
  
      this.container.addEventListener("click", this.open);
      document.body.addEventListener("click", this.close);
    }
  
    open() {
      if (event.target.classList.contains("place-card__image")) {
        let img = event.target.style.backgroundImage.match(/^url\((.+)\)$/);
        let template = `<div class="popup-container">
      <div class="popup-container__image">
        <img class="popup__image" src=${img[1]}>
        <img src="./images/close.svg" alt="" id = 'dell' class="popup__close">
      </div>
    </div>`;
  
        document.querySelector(".root").insertAdjacentHTML("afterEnd", template);
      }
    }
  
    close() {
      const popupImage = document.querySelector(".popup-container");
      if (event.target === document.querySelector("#dell")) {
        popupImage.remove();
      }
    }
  }
  
  export const popupImg2 = new PopupImg(cardsBox);