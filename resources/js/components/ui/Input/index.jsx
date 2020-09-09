import React from 'react';
import classNames from 'classnames/bind';
import styles from './Input.module.sass';
const cx = classNames.bind(styles);

class Input extends React.Component {
    constructor(props) {
        super(props);
        const { value = '' } = props;
        this.state = {
            value,
            focused: false
        };
    }

    onLabelClick = () => {
        this.input.focus();
    }

    onFocus = () => {
        this.setState({
            focused: true
        });
    }

    onBlur = (e) => {
        const { onBlur } = this.props;
        onBlur(e);
        this.setState({
            focused: false
        });
    }

    onChange = (e) => {
        const { value } = e.currentTarget;
        this.setState({
            value
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps)
            || JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    render() {
        const {
            id,
            icon,
            label,
            type = 'text',
            value,
            onChange,
            onBlur,
            error,
            classes,
            ...rest
        } = this.props;

        const { focused } = this.state;

        const wrapStyle = cx({
            'input': true,
            'input--with-icon': icon,
            'input--focused': value || focused,
            [classes]: true
        });

        return (
            <div className={ wrapStyle }>
                <i className={ styles.icon }>
                    { icon.render() }
                </i>
                <input
                    name={ id }
                    value={ value }
                    type={ type }
                    placeholder=""
                    ref={ ref => this.input = ref }
                    onBlur={ this.onBlur }
                    onFocus={ this.onFocus }
                    onChange={ onChange }
                    { ...rest }
                />
                { label && (
                    <label 
                        className={ styles.label }
                        onClick={ this.onLabelClick }
                    >
                        { label }
                    </label>
                ) }
                { !focused && <span className={ styles.error }>{ error }</span> }
            </div>
        );
    }
};

export default Input;