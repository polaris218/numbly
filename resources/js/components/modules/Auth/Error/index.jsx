import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { deleteError } from '@/actions/auth';
import getHistory from '@/helpers/history';
import Button from '@/ui/Button';
import DisableScroll from '@/ui/DisableScroll';

const onBackClick = props => () => {
    const { deleteError } = props;
    const history = getHistory();
    deleteError(() => history.replace('/auth'));
};

const ErrorScreen = props => {
    const { errorData } = props.location.state;

    const wrapStyle = classNames({
        'container container--fluid not-found__wrap': true
    });

    return (
        <DisableScroll fullScreen>
            <div className="not-found auth-error">
                <div className={ wrapStyle }>
                    <h2 className="not-found__title auth-error__title">Oops...</h2>
                    <p className="not-found__desc auth-error__desc">{ errorData && errorData.message }</p>
                    <Button 
                        block 
                        accent 
                        classes="not-found__button" 
                        onClick={ onBackClick(props) }
                    >Go back</Button>
                </div>
            </div>
        </DisableScroll>
    );
};

const mapDispatchToProps = {
    deleteError
};

export default connect(null, mapDispatchToProps)(ErrorScreen);