import { parseFromCookie } from '@/helpers/parseAuthData';
import { SET_AUTH, GET_ERROR, DELETE_ERROR, SWITCH_TOKEN } from '@/constants/auth';

const initialState = {
    token: parseFromCookie(),
    error: undefined,
    errorData: undefined
};

const actionHandlers = {
    [SET_AUTH] (state, payload) {
        if (!payload) {
            return {};
        }
        return payload;
    },
    [GET_ERROR] (state, errorData) {
        return {
            ...state,
            errorData
        };
    },
    [DELETE_ERROR] (state) {
        return {
            ...state,
            error: undefined,
            errorData: undefined
        };
    },
    [SWITCH_TOKEN] (state, payload) {
        return {
            ...state,
            error: undefined,
            errorData: undefined,
            token: payload
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