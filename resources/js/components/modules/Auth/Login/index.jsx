/**
 * @deprecated
 */

import React from 'react';
import classNames from 'classnames';
import LoginForm from './LoginForm';

const Login = ({ history, login, hidden = false, classes = '', back }) => {
    const loginCallback = values => {
        login({
            ...values,
            callback: () => history.replace('/')
        });
    };

    const style = classNames({
        'nimbly-login__hidden': hidden,
        'nimbly-login__hidden123': hidden,
        [classes]: true
    });

    return (
        <div className={ style }>
            <LoginForm callback={ loginCallback } back={ back } />
        </div>
    );
};

export default Login;