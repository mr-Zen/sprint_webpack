import {resError} from './res_error.js'

// Проверка на значения полей
export function minVal(elem, error) {
    if (!elem.value) {
      error.classList.add("error-message_active");
      error.textContent = "Обязательное поле";
    } else if (elem.value.length < 2 || elem.value.length > 30) {
      error.classList.add("error-message_active");
      error.textContent = "Должно быть от 2 до 30";
    } else {
      resError(error);
    }
  }