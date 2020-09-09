import axios from 'helpers/axios';
import CookieHelper from 'helpers/CookieHelper';
import { SET_AUTH, GET_ERROR, SWITCH_TOKEN } from 'constants/auth';
import { getProfile, resetProfile } from './profile';

const setAuth = (payload) => ({
    type: SET_AUTH,
    payload
});

const getErrorAction = payload => ({
    type: GET_ERROR,
    payload
});

export const saveAuth = authData => async dispatch => {
    const { token, error = undefined } = authData;

    if (error || !token) {
        dispatch(setAuth({
            error: error || 'No token.'
        }));
        return;
    }

    try {
        await dispatch(getProfile(token));
        dispatch(setAuth({ token }));
        CookieHelper.setCookie('token', token);
    } catch (e) {
        console.error(e);
    }
};

export const logout = callback => async dispatch => {
    dispatch(setAuth(null));
    CookieHelper.deleteCookie('token');
    if (callback) {
        callback();
    }
};

export const switchToken = () => async (dispatch, getStore) => {
    const { auth: token } = getStore();
    if (!token) {
        return;
    }

    try {
        const response = await axios.post('/login/switchToken', {
            body: {
                token
            }
        });
        dispatch({
            type: SWITCH_TOKEN,
            payload: response.data
        });
    } catch (e) {
        // Do nothing.
        dispatch(logout());
    }
};

export const getError = code => async dispatch => {
    try {
        const url = `/errorData?error=${ code }`;
        const response = await axios.get(url);
        dispatch(getErrorAction(response.data));
    } catch {
        dispatch(getErrorAction({
            message: 'Something went wrong.'
        }));
    }
};

export const deleteError = callback => async dispatch => {
    await dispatch(resetProfile());
    if (callback) {
        callback();
    }
};