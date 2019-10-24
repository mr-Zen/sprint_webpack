import {formEdit, userEdit, userProf, btnEditUser} from './variable'

// Активная кнопка редактирования профиля
export default formEdit.addEventListener("input", function() {
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