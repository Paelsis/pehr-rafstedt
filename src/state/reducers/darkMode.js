const initialState = {
    isDarkMode: false,
};

const TOOGLE_DARKMODE = 'TOGGLE_DARKMODE';

// action   
export const setLanguagerkMode = isDarkMode => ({
    type: TOOGLE_DARKMODE, 
    isDarkMode 
});

// reducer
export default (state = initialState, action) => {
switch (action.type) {
    case TOOGLE_DARKMODE:
        return { ...state, isDarkMode: action.isDarkMode };
    default:
        return state;
    }
};