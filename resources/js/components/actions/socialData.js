import axios from '@/helpers/axios';
import { GET_SOCIAL_DATA, GET_SOCIAL_DATA_ACTION } from '@/constants/socialData';

export const getSocialData = () => async dispatch => {
    dispatch({
        type: GET_SOCIAL_DATA_ACTION
    });
    try {
        const response = await axios.get('/getSocialData');
        dispatch({
            type: GET_SOCIAL_DATA,
            payload: response.data
        });
    } catch (e) {
        console.error(e);
    }
};