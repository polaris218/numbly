import React from 'react';
import classNames from 'classnames/bind';
import styles from './Image.module.sass';
const cx = classNames.bind(styles);

const Image = ({ alt, classes, ...rest }) => {
    const wrapStyle = cx({
        wrap: true,
        [classes]: true
    });
    return (
        <div className={ wrapStyle }>
            <img className={ styles.image } { ...rest } alt={ alt || '' } />
        </div>
    );
};

export default Image;