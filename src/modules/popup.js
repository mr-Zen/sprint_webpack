import {popup, btnAdd, btnEdit, formAdd, formEdit, popupTitle} from './variable.js';

class Popup {
    constructor(container, button) {
      this.container = container;
      this.button = button;
  
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
  
      this.container
        .querySelector(".popup__close")
        .addEventListener("click", this.close);
  
      this.button.addEventListener("click", this.open);
    }
  
    open() {
      this.container.classList.add("popup_is-opened");
      if (this.button === btnAdd) {
        formEdit.classList.add("popup__form-none");
        popupTitle.textContent = "Новое место";
      }
      if (this.button === btnEdit) {
        formAdd.classList.add("popup__form-none");
        popupTitle.textContent = "Редактировать профиль";
      }
    }
  
    close() {
      this.container.classList.remove("popup_is-opened");
      formEdit.classList.remove("popup__form-none");
      formAdd.classList.remove("popup__form-none");
    }
  }

  export const popUp1 = new Popup(popup, btnAdd);
  export const popUp2 = new Popup(popup, btnEdit);
