import Moment from 'moment';
import * as locales from 'moment/min/locales';

let locale = window.navigator.userLanguage || window.navigator.language;
  
if (!locale) { 
  locale = 'en' 
}

Moment.locale(locale);
console.log('locale:', Moment.locale());