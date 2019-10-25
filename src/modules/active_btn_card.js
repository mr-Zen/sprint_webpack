import {formAdd} from './variable.js'

//Активная кнопка в форме "Новое место"
export default formAdd.addEventListener("input", function() {
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