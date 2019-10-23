import {formEdit} from './variable.js'

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