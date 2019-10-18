const cardsBox = document.querySelector(".places-list");
const popup = document.querySelector(".popup");
const btnAdd = document.querySelector(".user-info__button");
const btnEdit = document.querySelector(".user-edit__button");
const closeAdd = document.querySelector(".popup__close");
const popupTitle = document.querySelector(".popup__title");
const formAdd = document.forms.new;
const formEdit = document.forms.edit;
const userEdit = formEdit.elements.name;
const userProf = formEdit.elements.profession;
const errorMessName = document.querySelector("#errorTextName");
const errorMessProf = document.querySelector("#errorTextProf");
const btnEditUser = document.querySelector("#btnEdit");

const ava = document.querySelector(".user-info__photo");

let infoName = document.querySelector(".user-info__name");
let infoProf = document.querySelector(".user-info__job");

const nameUser = formAdd.elements.name;
const linkUser = formAdd.elements.link;

// Можно улучшить имя скорее config для объекта
const constructor = { 
  ip: "95.216.175.5",
  id: "cohort3",
  token: "fa398ac4-e481-4ab2-ab2e-44918f0de62f",
  name: userEdit,
  about: userProf
};

class Api {
  constructor({ ip, id, token, name, about }) {
    this.ip = ip;
    this.id = id;
    this.token = token;
    this.name = name;
    this.about = about;
    /**
     * Хорошо
     *
     * Параметры передаются и записываются в поля класса без внешних завимимостей
     */
  }

  getUserId() {
    return ( // можно лучше достаточно return fetch - лучше указывать протокол
      fetch(`//${this.ip}/${this.id}/users/me`, {
        method: "GET", // Хорошо - указан тип запроса
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
        // .then(res => {

        //   ava.style.backgroundImage = `url(${res.avatar})`;
        //   infoName.textContent = res.name;
        //   infoProf.textContent = res.about;

        //   /**
        //    * Надо исправить
        //    *
        //    * В каждом классе правильнее отделять логические действия
        //    * Работа с данными должна проходить отдельно от отрисовки
        //    *
        //    * Ниже за пределами класса Api можно выполнить
        //    * api.getUser().then(res => {
        //    *  if (res.avatar ..) важно проверять наличие всех полей перед обновлением
        //    * разметки - если какое-то поле не пришло с сервера работа приложения
        //    * может быть остановлена - следует избегать ошибок
        //    * })
        //    */
        // })
        .catch(err => {
          console.log("Ошибка", err);
        })
    );
  }

  getInitialCards() {
    return fetch(`//${this.ip}/${this.id}/cards`, {
      method: "GET",
      headers: {
        authorization: this.token,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
          // обработка ошибок - исправить
        }
        return Promise.reject(res.status);
      })
      .then(cards => {
        new CardList(cardsBox, cards);
        // можно лучше api.getInitialCards().then(cards => new CardList(cardsBox, cards))
        // отрисовку стоит проводить отдельно от класса работы с данными
      })
      .catch(err => {
        console.log("Ошибка", err);
      });
  }

  editProfile(name, about) {
    return (
      fetch(`//${this.ip}/${this.id}/users/me`, {
        /**
         * Можно улучшить - часть адреса http может меняться на https
         * на разных серверах - стоит предусмотреть легкую смену без редактирования
         * всех методов с запросами к серверу
         */
        method: "PATCH",
        headers: {
          authorization: this.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          about: about
          /**
           * Надо исправить
           *
           * Получаются внешние зависимости
           * лучше передавать параметрами
           * editProfile(name, about) это позволит повысить надежность приложения
           */
        })
        // Можно улучшить JSON.stringify({ name, about }) ключи можно не дублировать
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        // .then(res => {
        //   infoName.textContent = res.name;
        //   infoProf.textContent = res.about; // исправить - вынести отдельно
        // })
        .catch(err => {
          console.log("Ошибка", err);
        })
        .finally(function() {
          renderLoading(false);
        })
    );
  }
  postCard(name, link) {
    return fetch(`//${this.ip}/${this.id}/cards`, {
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

const api = new Api(({ ip, id, token, name, about } = constructor));
// можно улучшить
/**
 *  const api = new Api({ 
      ip: "95.216.175.5",
      id: "cohort3",
      token: "fa398ac4-e481-4ab2-ab2e-44918f0de62f",
      name: userEdit,
      about: userProf
    });
 */

// Отрисовка имени, профессии, аватара
api.getUserId().then(res => {
  if (res.avatar && res.name && res.about) {
    ava.style.backgroundImage = `url(${res.avatar})`;
    infoName.textContent = res.name;
    infoProf.textContent = res.about;
  }
});

class Card {
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

class CardList {
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

api.getInitialCards();
/**
 * Можно улучшить
 *
 * Логически промисы работают так
 * api.getInitialCards().then(cards => new cardList(box, cards))
 *
 * другие сценарии не гарантируют создание экземпляра
 * класса только после получения данных
 */

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

const popUp1 = new Popup(popup, btnAdd);
const popUp2 = new Popup(popup, btnEdit);

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

const popupImg2 = new PopupImg(cardsBox);

// Like и удаление карточек

cardsBox.addEventListener("click", Card.prototype.likeDell);

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

// Проверка на значения полей
function minVal(elem, error) {
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

// Валидация поля с именем
function validateName() {
  minVal(userEdit, errorMessName);
}

// Валидация поля с профессией
function validateProf() {
  minVal(userProf, errorMessProf);
}

//Редактирование профиля
formEdit.addEventListener("submit", function(event) {
  event.preventDefault();
  renderLoading(true);
  api.editProfile(userEdit.value, userProf.value).then(res => {
    infoName.textContent = res.name;
    infoProf.textContent = res.about;
  });
  popupSwitch();
  formNone();
});

//Добавление карточек через форму
formAdd.addEventListener("submit", function(event) {
  event.preventDefault();
  api.postCard(nameUser.value, linkUser.value);
  popupSwitch();
});

//Активная кнопка в форме "Новое место"
formAdd.addEventListener("input", function() {
  const nameFoto = formAdd.elements.name.value;
  const linkFoto = formAdd.elements.link.value;

  const btnAddFoto = document.querySelector("#btnAddd");
  if (nameFoto.length > 0 && linkFoto.length > 0) {
    btnAddFoto.removeAttribute("disabled");
    btnAddFoto.classList.add("active-button");
  } else {
    btnAddFoto.setAttribute("disabled", "true");
    btnAddFoto.classList.remove("active-button");
  }
});

// Валидация поля с именем
userEdit.addEventListener("input", validateName);

// Валидация поля с профессией
userProf.addEventListener("input", validateProf);

// Активная кнопка редактирования профиля
formEdit.addEventListener("input", function() {
  if (
    !userEdit.value ||
    !userProf.value ||
    userEdit.value.length < 2 ||
    userEdit.value.length > 30 ||
    userProf.value.length < 2 ||
    userProf.value.length > 30
  ) {
    btnEditUser.disabled = true;

    btnEditUser.classList.remove("active-button");
  } else {
    btnEditUser.removeAttribute("disabled");
    btnEditUser.classList.add("active-button");
  }
});

/**
 * 
 * Работа выполнена хорошо
 * 
 * Обратите внимание на комментарии по работе с данными
 * обычно классы отделяют по логическим действиям от отрисовки
 * 
 */