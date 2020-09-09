import React from 'react';
import classNames from 'classnames/bind';
import Button from 'ui/Button';
import styles from './Modal.module.sass';
import DisableScroll from 'ui/DisableScroll';
const cx = classNames.bind(styles);

const Modal = props => {
    const { shown, history, hideModal } = props;
    const outerStyle = cx({
        'outer': true,
        'outer--hidden': !shown
    });
    const wrapStyle = cx({
        'wrap': true,
        'wrap--hidden': !shown
    });

    const onButtonClick = link => () => {
        hideModal();
        history.push(link);
    };

    return (
        <DisableScroll fullScreen classes={ wrapStyle }>
            <div className={ outerStyle }>
                <div className={ styles.modal }>
                    <p className={ styles.text }>Your ad has been successfully created!</p>
                </div>
                <div className={ styles.buttons }>
                    <Button accent onClick={ onButtonClick('/ads') }>View my ads</Button>
                    <Button gray onClick={ onButtonClick('/') }>Go back</Button>
                </div>
            </div>
        </DisableScroll>
    );
};

export default Modal;