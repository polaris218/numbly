import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import isLinkActive from '../helpers/isLinkActive';

const MenuItem = props => {
    const { to, onLogoutClick, onItemClick, title, onlyBrowser = false } = props;

    const linkStyle = classNames({
        'drawer-menu__link': true,
        'drawer-menu__link--active': isLinkActive(to),
        'browser-only': onlyBrowser
    });

    if (!to) {
        return (
            <li className="drawer-menu__item">
                <button 
                    className="drawer-menu__link" 
                    type="button" 
                    onClick={ onLogoutClick }
                >
                    { title }
                </button>
            </li>
        );
    }

    return (
        <li className="drawer-menu__item">
            <Link 
                to={ to } 
                className={ linkStyle }
                onClick={ onItemClick }
            >
                { title }
            </Link>
        </li>
    );
};

export default MenuItem;