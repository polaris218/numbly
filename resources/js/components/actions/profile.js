import axios from 'helpers/axios';
import { GET_PROFILE, GET_PROFILE_ACTION, GET_PROFILE_ERROR, RESET_PROFILE } from 'constants/profile';

const DEFAULT_ERROR = {
    status: 0,
    data: {
        error: 'Server not available.'
    }
};

const getProfileAction = () => ({
    type: GET_PROFILE_ACTION
});

const getProfileSuccess = payload => ({
    type: GET_PROFILE,
    payload
});

const getProfileError = payload => ({
    type: GET_PROFILE_ERROR,
    payload
});

const resetProfileAction = () => ({
    type: RESET_PROFILE
});

const getRequestAxios = (token) => {
    if (!token) {
        return axios;
    }

    axios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${ token }`;
        return config;
    });

    return axios;
};

export const getProfile = token => async dispatch => {
    dispatch(getProfileAction());
    try {
        const axiosInstance = getRequestAxios(token);
        const response = await axiosInstance.get('/profile');
        dispatch(getProfileSuccess(response.data));
    } catch (e) {
        const response = e.response || DEFAULT_ERROR;
        const { data, status } = response;
        const error = {
            message: data.error,
            code: status
        };

        dispatch(getProfileError(error));
        if (token) {
            throw error;
        }
    }
};

export const resetProfile = () => async dispatch => {
    dispatch(resetProfileAction());
};