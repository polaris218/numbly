export default search => {
    const urlParams = [ ...new URLSearchParams(search).entries() ];
    const result = urlParams.reduce((sum, [ key, val ]) => {
        return Object.assign({ [key]:val }, sum);
    }, {});
    return result;
};

export const addParamsURL = (link, params) => {
    const searchParams = new URLSearchParams();
    const keys = Object.keys(params);
    keys.forEach(val => {
        if (params[val]) {
            searchParams.append(val, params[val]);
        }
    });
    const searchString = searchParams.toString();
    return searchString ? `${ link }?${ searchString }` : link;
};