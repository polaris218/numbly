import axios from 'helpers/axios';
import { 
    GET_MY_POSTS, 
    GET_MY_POSTS_SUCCESS,
    CREATE_POST, 
    HIDE_MODAL
} from 'constants/saved';

export const getPosts = (callback) => async dispatch => {
    dispatch({
        type: GET_MY_POSTS
    });
    try {
        const response = await axios.get('/posts');
        const items = response.data;
        dispatch({
            type: GET_MY_POSTS_SUCCESS,
            payload: items
        });
    } catch {
        console.error('Cannot retrieve data.');
        dispatch({
            type: GET_MY_POSTS_SUCCESS,
            payload: []
        });
    }
    if (callback) {
        callback();
    }
};

export const deletePost = (id, callback) => async dispatch => {
    try {
        await axios.delete(`/post/${ id }`);
        dispatch(getPosts(callback));
    } catch (e) {
        console.error(e);
    }
};

export const createPost = (options) => async dispatch => {
    const { image = '', caption = '' } = options;
    try {
        const response = await axios.post('/post', {
            image,
            caption
        });
        dispatch({
            type: CREATE_POST,
            payload: response.data
        });
    } catch (e) {
        //TODO: ignore for now.
    }
};

export const hideModal = () => async dispatch => {
    dispatch({
        type: HIDE_MODAL
    });
};