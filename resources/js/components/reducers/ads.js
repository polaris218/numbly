import { 
    GET_BOOSTED_SUCCESS, 
    GET_BOOSTED, 
    REFRESH_BOOSTED, 
    CREATE_BOOSTED, 
    HIDE_AD_MODAL
} from '@/constants/ads';

const initialState = {
    posts: [],
    modal: false
};

const actionHandlers = {
    [GET_BOOSTED_SUCCESS] (state, payload) {
        return {
            ...state,
            posts: payload,
            loading: false
        };
    },
    [GET_BOOSTED] (state, payload) {
        return {
            ...state,
            loading: true
        };
    },
    [REFRESH_BOOSTED] (state, posts) {
        return {
            ...state,
            posts
        };
    },
    [CREATE_BOOSTED] (state) {
        return {
            ...state,
            modal: true
        };
    },
    [HIDE_AD_MODAL] (state) {
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