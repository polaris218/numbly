import React from 'react';
import { Link } from 'react-router-dom';

const NavLink = (props) => {
    const {
        children,
        classes = "",
        disabled,
        rel,
        to,
        outside = false,
        target,
        onClick
    } = props;

    const visionaryProps = {
        target,
        className: classes,
        disabled,
        rel,
        onClick
    };

    if (outside) {
        return (
            <a href={ to } { ...visionaryProps }>{ children }</a>
        );
    }

    return (
        <Link to={ to } { ...visionaryProps }>{ children }</Link>
    );
};

export default NavLink;