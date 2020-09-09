import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getHistory from 'helpers/history';

const Proceed = props => {
    const { data, ready, loading } = props;
    useEffect(() => {
        const history = getHistory();
        if (Object.keys(data).length) {
            if (ready) {
                history.replace('/');
                return;
            }
            history.replace('/auth/build-profile');
            return;
        }
        if (!loading) {
            history.replace(`/auth/error?code=${ 1 }`, {
                errorData: {
                    message: 'Something went wrong'
                }
            });
        }
    });

    return (
        <div></div>
    );
};

const mapStateToProps = ({ profile }) => ({
    data: profile.data,
    ready: profile.data.ready,
    loading: profile.loading
});

export default connect(mapStateToProps)(Proceed);