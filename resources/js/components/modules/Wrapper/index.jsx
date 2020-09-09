import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setPage as setPageInfo } from '@/actions/content';
import { getProfile } from '@/actions/profile';
import { logout } from '@/actions/auth';
import getHistory from '@/helpers/history';
import { isLoginScreen } from '@/helpers/locations';

const Wrapper = props => {
    const { 
        children, 
        auth, 
        location: { pathname }, 
        setPageInfo, 
        page, 
        pageTitle,
        profileData,
        profileLoading,
        profileError,
        getProfile,
        logout
    } = props;

    useEffect(() => {
        if (page.link !== pathname) {
            const newPage = {
                page: pathname,
                prevPage: page.link,
                title: pageTitle
            };
            setPageInfo(newPage);
        }
    }, [ page, pageTitle, pathname, setPageInfo ]);

    useEffect(() => {
        if (!profileError && auth && !Object.keys(profileData).length && !profileLoading) {
            getProfile();
        }
        if (profileError) {
            const history = getHistory();
            const { code } = profileError;
            history.replace(`/auth/error?code=${ code }`, {
                errorData: profileError
            });
            logout();
        }
    }, [ profileData, profileLoading, getProfile, auth, profileError, logout ]);
    
    if (!auth && !isLoginScreen(pathname)) {
        return <Redirect to="/auth" />;
    }

    return children;
};

const mapStateToProps = ({ auth, content, profile }) => ({
    auth: auth.token,
    page: {
        link: content.page,
        prevPage: content.prevPage
    },
    profileData: profile.data,
    profileLoading: profile.loading,
    profileError: profile.error
});

const mapDispatchToProps = {
    setPageInfo,
    getProfile,
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);