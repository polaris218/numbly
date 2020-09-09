import axios from 'axios';
import CookieHelper from './CookieHelper';
import getHistory from './history';

const history = getHistory();
const authPath = '/auth';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.request.use(
    config => {
        config.headers.Authorization = config.headers.Authorization || '';

        const token = CookieHelper.getCookie('token');
        if (token) {
            config.headers.Authorization = `Bearer ${ token }`;
        }

        return config;
    },
    error => Promise.reject(error)
);

instance.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        const data = error.response;
        let status = "";

        if (data) {
            status = data.status;
        }

        if (status === 404) {
            // return history.replace('/');
        }

        if (status !== 401) {
            return Promise.reject(error);
        }

        try {
            const response = await refreshToken();
            CookieHelper.setCookie('token', response.data.token);
            return instance(error.config);
        } catch(error) {
            CookieHelper.deleteCookie('token');
            if (history.location.pathname !== authPath) {
                history.replace(authPath);
            }
            return Promise.reject(error);
        }
    }
);

const refreshToken = () => {
    return instance.post('/login/switchToken', {
        token: CookieHelper.getCookie('token')
    });
};

export default instance;