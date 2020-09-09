import { SET_PAGE, SET_MENU } from 'constants/content';

const setPageAction = payload => ({
    type: SET_PAGE,
    payload
});

const setMenuAction = payload => ({
    type: SET_MENU,
    payload
});

export const setPage = (pageInfo) => async dispatch => {
    dispatch(setPageAction(pageInfo));
};

export const setMenu = menuStatus => async dispatch => {
    dispatch(setMenuAction(menuStatus));
};