import { combineReducers } from 'redux'
import darkMode from './darkMode'
import language from './language'
import zoom from './zoom'
export default combineReducers({darkMode, language, zoom});
