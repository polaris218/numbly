import { SET_PAGE, SET_MENU } from 'constants/content';

const initialState = {
    page: '',
    title: '',
    prevPage: '',
    menuOpened: false
};

const actionHandlers = {
    [SET_PAGE] (state, { page, title, prevPage }) {
        return {
            ...state,
            page,
            title,
            prevPage,
            menuOpened: false
        };
    },
    [SET_MENU] (state, payload) {
        return {
            menuOpened: payload
        };
    }
};

export default (state = initialState, { type, payload }) => {
    const actionHandler = actionHandlers[type];
    if (actionHandler) {
        return actionHandler(state, payload);
    }
    return state;
};