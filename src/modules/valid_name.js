import {userEdit, errorMessName} from './variable.js'
import {minVal} from './valid_input.js'
// Валидация поля с именем
function validateName() {
    minVal(userEdit, errorMessName);
  }
  
export default userEdit.addEventListener("input", validateName);
