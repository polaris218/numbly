import React from 'react';
import { connect } from 'react-redux';
import Button from 'ui/Button';
import DisableScroll from 'ui/DisableScroll';

const goBack = ({ prevPage }) => {
    return prevPage || '/';
};

const NotFound = props => (
    <DisableScroll>
        <div className="not-found">
            <div className="container container--fluid not-found__wrap">
                <h2 className="not-found__title">404</h2>
                <p className="not-found__desc">No&nbsp;trail of&nbsp;your page here, sorry</p>
                <Button classes="not-found__button" accent block to={ goBack(props) }>Go back</Button>
            </div>
        </div>
    </DisableScroll>
);

const mapStateToProps = ({ content }) => ({
    prevPage: content.prevPage
});

export default connect(mapStateToProps)(NotFound);