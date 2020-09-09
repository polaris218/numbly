import axios from '@/helpers/axios';
import { 
    GET_BOOSTED_SUCCESS, 
    REFRESH_BOOSTED, 
    CREATE_BOOSTED, 
    HIDE_AD_MODAL,
    GET_BOOSTED
} from '@/constants/ads';

export const getPosts = (page = 0) => async dispatch => {
    dispatch({
        type: GET_BOOSTED
    });
    try {
        const response = await axios.get('/adposts');
        const items = response.data;
        dispatch({
            type: GET_BOOSTED_SUCCESS,
            payload: items
        });
    } catch {
        console.error('Cannot retrieve data.');
        dispatch({
            type: GET_BOOSTED_SUCCESS,
            payload: []
        });
    }
};

export const refreshPosts = callback => async dispatch => {
    try {
        const response = await axios.get('/adposts');
        const items = response.data;
        dispatch({
            type: REFRESH_BOOSTED,
            payload: items
        });
        if (callback) {
            callback();
        }
    } catch {
        console.error('Cannot retrieve data.');
        dispatch({
            type: REFRESH_BOOSTED,
            payload: []
        });
        if (callback) {
            callback();
        }
    }
};

export const createAd = (options) => async dispatch => {
    const { image = '', caption = '', gender = 0, minAge = 18, maxAge = 60 } = options;
    try {
        const response = await axios.post('/adpost', {
            image,
            caption,
            gender,
            minAge,
            maxAge
        });
        dispatch({
            type: CREATE_BOOSTED,
            payload: response.data
        });
    } catch (e) {
        //TODO: ignore for now.
    }
};


export const hideAdModal = () => async dispatch => {
    dispatch({
        type: HIDE_AD_MODAL
    });
};
