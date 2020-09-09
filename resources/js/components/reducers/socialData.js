import { GET_SOCIAL_DATA, GET_SOCIAL_DATA_ACTION } from 'constants/socialData';

const initialState = {
    ready: false,
    loading: false
};

const actionHandlers = {
    [GET_SOCIAL_DATA] (state, payload) {
        return {
            ...state,
            ready: payload.ready,
            loading: false
        };
    },
    [GET_SOCIAL_DATA_ACTION] (state) {
        return {
            ...state,
            loading: true
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