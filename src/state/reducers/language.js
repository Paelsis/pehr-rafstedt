export const SET_LANGUAGE='SET_LANGUAGE'
export const LANGUAGE_EN='EN' // English
export const LANGUAGE_SV='SV' // Swedish
export const LANGUAGE_ES='ES' // Spanish

const initialState = LANGUAGE_EN

export const setLanguage = (language) => ({
      type: SET_LANGUAGE,
      language,
})
  
export default (state = initialState, action) => {
    switch (action.type) {
      case 'SET_LANGUAGE':
        return action.language
      default:
        return state
    }
}
  