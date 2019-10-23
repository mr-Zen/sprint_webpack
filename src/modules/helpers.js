// Кнопка отправки данных юзера
function renderLoading(isLoading) {
    if (isLoading) {
      btnEditUser.textContent = "Загрузка...";
    } else {
      btnEditUser.textContent = "Сохранить";
    }
  }

  // Удаление класса с display: none для форм добавления и редактирования профиля
function formNone() {
    formEdit.classList.remove("popup__form-none");
    formAdd.classList.remove("popup__form-none");
  }
  
  //
  function popupSwitch() {
    popup.classList.toggle("popup_is-opened");
  }
  
  // Сброс сообщения ошибки
  function resError(elem) {
    elem.classList.remove("error-message_active");
  }