import axios from '@/helpers/axios';
import { addParamsURL } from '@/helpers/parseUrl';
import { 
    GET_RECOMMENDED_SUCCESS, 
    GET_RECOMMENDED,
    REFRESH_POSTS
} from '@/constants/recommended';

export const getPosts = (hashtag = '', cursor = 0) => async dispatch => {
    dispatch({
        type: GET_RECOMMENDED,
        payload: hashtag
    });
    const baseURL = '/recommended';
    const url = addParamsURL(baseURL, { hashtag, cursor });
    try {
        const response = await axios.get(url);
        const items = response.data;
        dispatch({
            type: GET_RECOMMENDED_SUCCESS,
            payload: { 
                hashtag,
                ...items,
            }
        });
    } catch {
        console.error('Cannot retrieve data.');
        dispatch({
            type: GET_RECOMMENDED_SUCCESS,
            payload: []
        });
    }
};


export const refreshPosts = (hashtag = '', callback) => async dispatch => {
    try {
        const baseURL = '/recommended';
        const url = addParamsURL(baseURL, { hashtag });
        const response = await axios.get(url);
        const items = response.data;
        dispatch({
            type: REFRESH_POSTS,
            payload: items
        });
        if (callback) {
            callback();
        }
    } catch {
        console.error('Cannot retrieve data.');
    }
};