import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSocialData } from 'actions/socialData';
import { getProfile } from 'actions/profile';
import Loader from 'ui/Loader';
import DisableScroll from 'ui/DisableScroll';

const CollectingScreen = props => {
    const { history, ready, loading, getSocialData, getProfile } = props;
    useEffect(() => {
        if (!ready) {
            if (!loading) {
                setTimeout(() => {
                    getSocialData();
                }, 2000);
                return;
            }
            return;
        }
        getProfile();
        history.replace('/auth/lets-go');
    }, [ ready, history, getSocialData, loading, getProfile ]);

    return (
        <DisableScroll>
            <div className="collecting">
                <div className="container container--limited collecting__wrap">
                    <h2 className="collecting__logo">Nimbly</h2>
                    <Loader classes="collecting__loader" />
                    <p className="collecting__desc">We&rsquo;re looking at&nbsp;your content history to&nbsp;build a&nbsp;Nimbly marketing profile. We&rsquo;ll use this profile to&nbsp;recommend content and build relevant audiences to&nbsp;boost your posts.</p>
                </div>
            </div>
        </DisableScroll>
    );
};

const mapStateToProps = ({ socialData }) => ({
    ready: socialData.ready,
    loading: socialData.loading
});

const mapDispatchToProps = {
    getSocialData,
    getProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectingScreen);