import React from 'react';
import classNames from 'classnames/bind';
import Button from 'ui/Button';
import styles from './Modal.module.sass';
import DisableScroll from 'ui/DisableScroll';
const cx = classNames.bind(styles);

const Modal = props => {
    const { shown, children, buttons = [] } = props;
    const outerStyle = cx({
        'outer': true,
        'outer--hidden': !shown
    });
    const wrapStyle = cx({
        'wrap': true,
        'wrap--hidden': !shown
    });

    return (
        <DisableScroll fullScreen classes={ wrapStyle }>
            <div className={ outerStyle }>
                <div className={ styles.modal }>
                    <p className={ styles.text }>{ children }</p>
                </div>
                <div className={ styles.buttons }>
                    { buttons.map((btn, idx) => (
                        <Button key={ idx } { ...btn }>
                            { btn.title }
                        </Button>
                    ))}
                    {/* <Button accent onClick={ onButtonClick('/ads') }>View my ads</Button>
                    <Button gray onClick={ onButtonClick('/') }>Go back</Button> */}
                </div>
            </div>
        </DisableScroll>
    );
};

export default Modal;