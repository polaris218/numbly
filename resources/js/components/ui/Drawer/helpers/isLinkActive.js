import getHistory from 'helpers/history';

export default link => {
    if (!link) {
        return false;
    }

    const regex = new RegExp(`^${ link }$`);
    const history = getHistory();
    const { location: { pathname } } = history;
    return regex.test(pathname);
};