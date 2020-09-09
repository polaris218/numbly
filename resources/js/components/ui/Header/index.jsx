import React from 'react';
import classNames from 'classnames';
import { ReactComponent as BurgerIcon } from 'assets/svg/burger.svg';

const isTransparentPage = link => {
    // eslint-disable-next-line
    const regex = /^\/profile[\/]?$/gmi;
    return regex.test(link);
};

class Header extends React.Component {
    state = {
        expanded: true
    }

    componentDidMount() {
        window.addEventListener('scroll', this.toggleExpand, false);
    }

    toggleExpand = () => {
        const offset = window.pageYOffset;
        if (offset) {
            this.setState({
                expanded: false
            });
            return;
        }
        this.setState({
            expanded: true
        });
    }

    render() {
        const { expanded } = this.state;
        const { onButtonClick, transparent = false, visible = false, title, pageLink, showsMenuButton } = this.props;
        
        const headerStyle = classNames({
            'header': true,
            'header--out': !visible,
            'header--fixed': !expanded,
            'nimbly-content--transformed': transparent,
            'header--transparent': isTransparentPage(pageLink)
        });

        const buttonStyle = classNames({
            'header__button': true,
            'header__button--active': transparent || !showsMenuButton
        });

        return (
            <header className={ headerStyle } ref={ ref => this.ref = ref }>
                <button 
                    className={ buttonStyle }
                    onClick={ onButtonClick }
                >
                    <BurgerIcon />
                    <span className="visually-hidden">Open mobile menu</span>
                </button>
                <h1 className="header__title">{ title }</h1>
            </header>
        );
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.toggleExpand, false);
    }
};

export default Header;