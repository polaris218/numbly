import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { saveAuth } from 'actions/auth';
import getHistory from 'helpers/history';
import Button from 'ui/Button';
import Login from './Login';
import DisableScroll from 'ui/DisableScroll';

class AuthScreen extends React.Component {
    state = {
        formOpened: false
    }

    componentDidMount() {
        window.addEventListener('auth', this.gotAuth);
    }

    componentDidUpdate() {
        const { error } = this.props;
        if (error) {
            const { code } = error;
            const history = getHistory();
            history.replace(`/auth/error?code=${ code }`, {
                errorData: error
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('auth', this.gotAuth);
    }

    switchMode = formOpened => () => this.setState({ formOpened });

    gotAuth = ({ detail }) => {
        const { saveAuth } = this.props;
        const { authData } = detail;
        const history = getHistory();
        if (!detail) {
            return;
        }
        saveAuth(authData);
        history.replace('/auth/proceed');
    }

    calculateHeight = ref => {
        if (!ref) {
            return;
        }
        ref.style.height = `${ ref.scrollHeight }px`;
    }

    getState = () => {
        const mode = process.env.NODE_ENV;
        if (mode !== 'production') {
            return process.env.REACT_APP_FRONT_URL;
        }

        return '';
    }

    openFacebook = () => {
        const url = `https://www.facebook.com/v4.0/dialog/oauth?client_id=${ process.env.REACT_APP_FB_ID }&redirect_uri=${ process.env.REACT_APP_REDIRECT_URI }&state=${ this.getState() }&scope=instagram_basic,ads_management,ads_read,manage_pages,business_management`;
        window.open(url);
    }

    render() {
        const { login } = this.props;
        const { formOpened } = this.state;

        const chooseStyle = classNames({
            'nimbly-login__button-wrap': formOpened,
            'nimbly-login__block': true
        });

        return (
            <DisableScroll fullScreen>
                <div className="nimbly-login">
                    <div className="nimbly-login__wrap">
                        <h2 className="nimbly-login__title">Welcome to <span className="nimbly-login__accent">Nimbly</span></h2>
                        <div className="nimbly-login__content" ref={ this.calculateHeight }>
                            <div className={ chooseStyle }>
                                <Button
                                    block
                                    accent 
                                    classes="nimbly-login__button"
                                    onClick={ this.openFacebook }
                                >
                                    Login with Facebook
                                </Button>
                                <Button
                                    block
                                    ghost
                                    onClick={ this.openFacebook }
                                >
                                    Sign up with Facebook
                                </Button>
                            </div>
                            <Login 
                                classes="nimbly-login__block" 
                                hidden={ !formOpened } 
                                login={ login }
                                back={ this.switchMode(false) }
                            />
                        </div>
                        <p className="nimbly-login__prescription">
                            Login with the account you manage your Facebook with. Make sure your Business Instagram account is connected to this page
                        </p>
                    </div>
                </div>
            </DisableScroll>
        );
    }
};

const mapStateToProps = ({ auth, profile }) => ({
    auth: auth.token,
    error: profile.error
});

const mapDispatchToProps = {
    saveAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);