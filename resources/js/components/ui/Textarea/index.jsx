import React from 'react';
import classNames from 'classnames/bind';
import { ReactComponent as TimesIcon } from '@/assets/svg/times.svg';
import styles from './Textarea.module.sass';
const cx = classNames.bind(styles);

const MIN_HEIGHT = 112;

class Textarea extends React.Component {
    constructor(props) {
        super(props);
        const { value = '' } = props;
        this.state = {
            value,
            focused: false
        };
    }

    componentDidMount() {
        const { scrollHeight } = this.input;
        const height = Math.max(MIN_HEIGHT, scrollHeight);
        this.input.style.height = `${ height }px`;
    }

    onLabelClick = () => {
        this.input.focus();
    }

    onFocus = () => this.setState({
        focused: true
    });

    onBlur = (e) => {
        const { onBlur } = this.props;
        onBlur(e);
        this.setState({
            focused: false
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return JSON.stringify(this.props) !== JSON.stringify(nextProps)
            || JSON.stringify(this.state) !== JSON.stringify(nextState);
    }

    componentDidUpdate() {
        const { scrollHeight } = this.input;
        const height = Math.max(MIN_HEIGHT, scrollHeight);
        this.input.style.height = `${ height }px`;
    }

    clear = () => {
        const { setValues } = this.props;
        setValues({
            description: ""
        });
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
            setValues,
            error,
            classes,
            ...rest
        } = this.props;

        const { focused } = this.state;

        const wrapStyle = cx({
            'textarea': true,
            'textarea--focused': value || focused,
            [classes]: !!classes
        });

        return (
            <div className={ wrapStyle }>
                <textarea
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
                { !!value.length && (
                    <button type="button" className={ styles.clear } onClick={ this.clear }>
                        <TimesIcon />
                    </button>
                ) }
                { !focused && <span className={ styles.error }>{ error }</span> }
            </div>
        );
    }
};

export default Textarea;