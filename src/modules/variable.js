export const cardsBox = document.querySelector(".places-list");
export const popup = document.querySelector(".popup");
export const btnAdd = document.querySelector(".user-info__button");
export const btnEdit = document.querySelector(".user-edit__button");
export const closeAdd = document.querySelector(".popup__close");
export const popupTitle = document.querySelector(".popup__title");
export const formAdd = document.forms.new;
export const formEdit = document.forms.edit;
export const userEdit = formEdit.elements.name;
export const userProf = formEdit.elements.profession;
export const errorMessName = document.querySelector("#errorTextName");
export const errorMessProf = document.querySelector("#errorTextProf");
export const btnEditUser = document.querySelector("#btnEdit");

export const ava = document.querySelector(".user-info__photo");

export let infoName = document.querySelector(".user-info__name");
export let infoProf = document.querySelector(".user-info__job");

export const nameUser = formAdd.elements.name;
export const linkUser = formAdd.elements.link;

export const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort3' : 'https://praktikum.tk/cohort3';
// Можно улучшить имя скорее config для объекта
export const config = { 
  ip: serverUrl,
  token: "fa398ac4-e481-4ab2-ab2e-44918f0de62f",
  name: userEdit,
  about: userProf
};