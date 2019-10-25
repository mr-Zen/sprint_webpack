//Добавление карточек через форму
import {formAdd, nameUser, linkUser} from './variable.js';
import {api} from './api.js';
import {popupSwitch} from './helpers.js'

export default formAdd.addEventListener("submit", function(event) {
    event.preventDefault();
    api.postCard(nameUser.value, linkUser.value);
    popupSwitch();
  });