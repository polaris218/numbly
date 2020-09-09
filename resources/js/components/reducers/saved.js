import { GET_MY_POSTS, GET_MY_POSTS_SUCCESS, CREATE_POST, HIDE_MODAL } from 'constants/saved';

const initialState = {
    posts: [],
    loading: false,
    modal: false
};

const actionHandlers = {
    [GET_MY_POSTS_SUCCESS] (state, payload) {
        return {
            ...state,
            posts: payload,
            loading: false
        };
    },
    [GET_MY_POSTS] (state) {
        return {
            ...state,
            loading: true
        };
    },
    [CREATE_POST] (state, payload) {
        return {
            ...state,
            modal: true
        };
    },
    [HIDE_MODAL] (state, payload) {
        return {
            ...state,
            modal: false
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