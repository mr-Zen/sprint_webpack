import {userProf, errorMessProf} from './variable.js';
import {minVal} from './valid_input.js'

// Валидация поля с профессией
 function validateProf() {
    minVal(userProf, errorMessProf);
  }

  
  export default userProf.addEventListener("input", validateProf);