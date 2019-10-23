import './pages/index.css';
import {api} from './modules/api.js';
import rander_name from './modules/render_name.js';
import likeDell from './modules/like_dell.js';
import editProfile from './modules/edit_profile.js';
import {popUp1, popUp2} from './modules/popup.js';
import {popUpImg2} from './modules/popup_img.js';
import {validateName} from './modules/valid_name.js'
import {validateProf} from './modules/valid_prof.js'
api.getInitialCards();
