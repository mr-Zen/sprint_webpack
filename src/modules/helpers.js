import {popup, btnEditUser, formEdit, formAdd} from './variable.js'

// Кнопка отправки данных юзера
export function renderLoading(isLoading) {
    if (isLoading) {
      btnEditUser.textContent = "Загрузка...";
    } else {
      btnEditUser.textContent = "Сохранить";
    }
  }

  // Удаление класса с display: none для форм добавления и редактирования профиля
export function formNone() {
    formEdit.classList.remove("popup__form-none");
    formAdd.classList.remove("popup__form-none");
  }
  
  //
  export function popupSwitch() {
    popup.classList.toggle("popup_is-opened");
  }
  
  // Сброс сообщения ошибки
  export function resError(elem) {
    elem.classList.remove("error-message_active");
  }