import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import parseUrl from '@/helpers/parseUrl';

const LoginRedirect = ({ location }) => {
    const [ isCloseable, setCloseable ] = useState(true);
    useEffect((isCloseable) => {
        const parent = window.opener;
        const { search } = location;
        const authData = parseUrl(search);
        const event = new CustomEvent('auth', {
            detail: {
                authData
            }
        });
        if (!parent || !Object.keys(authData).length) {
            window.close();
            setCloseable(false);
            return;
        }
        parent.dispatchEvent(event);
        window.close();
    }, [location]);

    if (!isCloseable) {
        return <Redirect to="/auth" />;
    }
    
    return <div></div>;
};

export default LoginRedirect;