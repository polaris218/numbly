import React from 'react';
import classNames from 'classnames/bind';
import Link from 'ui/Link';
import styles from './Button.module.sass';
const cx = classNames.bind(styles);

const Button = (props) => {
    const {
        children,
        classes = "",
        outline,
        accent,
        gray,
        ghost,
        center,
        disabled,
        type = 'button',
        block,
        rel,
        to,
        outside = false,
        target,
        onClick
    } = props;

    const style = cx({
        button: true,
        outline,
        accent,
        gray,
        center,
        ghost,
        block,
        [classes]: true
    });

    const visionaryProps = {
        disabled,
        rel,
        onClick,
    };

    if (to) {
        return (
            <Link
                to={ to }
                target={ target }
                outside={ outside }
                classes={ style }
                { ...visionaryProps }
            >
                { children }
            </Link>
        );
    }

    return (
        <button className={ style } type={ type } { ...visionaryProps }>
            { children }
        </button>
    );
};

export default Button;