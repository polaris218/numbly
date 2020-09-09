import axios from 'helpers/axios';
import { COLLECT } from 'constants/collect';

export const collect = () => async dispatch => {
    try {
        const response = await axios.get('/checkUser');
        dispatch({
            type: COLLECT,
            payload: response.data
        });
    } catch (e) {
        //TODO: ignore for now.
    }
};