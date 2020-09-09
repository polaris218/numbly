import { GET_PROFILE, GET_PROFILE_ACTION, GET_PROFILE_ERROR, RESET_PROFILE } from 'constants/profile';

const initialState = {
    data: { },
    loading: false,
    error: null
};

const actionHandlers = {
    [GET_PROFILE] (state, profile) {
        return {
            ...state,
            loading: false,
            data: profile
        };
    },
    [GET_PROFILE_ACTION] (state) {
        return {
            ...state,
            loading: true
        };
    },
    [GET_PROFILE_ERROR] (state, error) {
        return {
            ...state,
            loading: false,
            error
        };
    },
    [RESET_PROFILE] (state) {
        return initialState;
    }
};

export default (state = initialState, { type, payload }) => {
    const actionHandler = actionHandlers[type];
    if (actionHandler) {
        return actionHandler(state, payload);
    }
    return state;
};