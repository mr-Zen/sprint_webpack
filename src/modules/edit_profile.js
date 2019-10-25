import {formEdit, userEdit, userProf, infoName, infoProf} from './variable.js';
import {renderLoading} from './helpers.js';
import {popupSwitch, formNone} from './helpers.js';
import {api} from './api.js'

//Редактирование профиля
export default formEdit.addEventListener("submit", function(event) {
    event.preventDefault();
    renderLoading(true);
    api.editProfile(userEdit.value, userProf.value).then(res => {
      infoName.textContent = res.name;
      infoProf.textContent = res.about;
    });
    popupSwitch();
    formNone();
  });
  