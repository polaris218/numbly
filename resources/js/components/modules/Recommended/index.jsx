import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { getPosts, refreshPosts } from 'actions/recommended';
import Posts from './Posts';

const refs = {
    scroll: null,
    updater: null
};

class Home extends React.Component {
    scrollTop = () => {
        const { scroll } = refs;
        const banisher = scroll.state.targetRef.current;
        if (!banisher) {
            return;
        }
        banisher.scrollTop = 0;
    }

    render() {
        const { hashtags } = this.props;
        return(
            <Fragment>
                <div className="recommended">
                    <div className="recommended__wrap">
                        { hashtags && <Posts { ...this.props } /> }
                    </div>
                </div>
            </Fragment>
        );
    };
}

const mapStateToProps = ({ recommended, profile }) => ({
    posts: recommended.posts,
    mentions: recommended.mentions,
    loading: recommended.loading,
    hashtags: profile.data.hashtags
});

const mapDispatchToProps = {
    getPosts,
    refreshPosts
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);