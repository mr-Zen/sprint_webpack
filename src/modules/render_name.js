
import {api} from './api.js';
import {ava, infoName, infoProf} from './variable'

export default api.getUserId().then(res => {
    if (res.avatar && res.name && res.about) {
      ava.style.backgroundImage = `url(${res.avatar})`;
      infoName.textContent = res.name;
      infoProf.textContent = res.about;
    }
  })