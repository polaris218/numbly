import React, { Fragment } from 'react';
import { onTouchStart, onTouchEnd, onTouchMove, dropDefault } from 'helpers/updater';
import DisableScroll from 'ui/DisableScroll';
import Empty from 'ui/Empty';
import { ReactComponent as UpdateIcon } from 'assets/svg/updater.svg';
import Item from './Item';
import emptyObj from './empty.json';

class Boosted extends React.Component {
    componentDidMount() {
        const { getPosts } = this.props;
        const { scroll, refresher, body } = this;
        getPosts();
        const banisher = scroll.state.targetRef.current;
        if (!banisher) {
            return;
        }
        banisher.addEventListener('touchstart', onTouchStart(body, refresher));
        banisher.addEventListener('touchmove', onTouchMove(body, refresher, banisher));
        banisher.addEventListener('touchend', onTouchEnd(body, refresher));
        refresher.addEventListener('refreshData', this.refresh);
    }

    componentWillUnmount() {
        const { scroll, refresher, body } = this;
        const banisher = scroll.state.targetRef.current;
        banisher.removeEventListener('touchstart', onTouchStart(body, refresher));
        banisher.removeEventListener('touchmove', onTouchMove(body, refresher, banisher));
        banisher.removeEventListener('touchend', onTouchEnd(body, refresher));
        refresher.addEventListener('refreshData', this.refresh);
    }

    refresh = () => {
        const { refreshPosts } = this.props;
        const { refresher, body } = this;
        refreshPosts(dropDefault(body, refresher));
    }

    render() {
        return(
            <Fragment>
                <div className="updater" ref={ ref => this.refresher = ref }>
                    <UpdateIcon />
                </div>
                <div ref={ ref => this.body = ref } rel="body">
                    <DisableScroll ref={ ref => this.scroll = ref }>
                        <div className="recommended">
                            <div className="container--limited">
                                <PostList { ...this.props } />
                            </div>
                        </div>
                    </DisableScroll>
                </div>
            </Fragment>
        );
    };
}

const PostList = props => {
    const { posts, loading } = props;
    if (!posts.length && !loading) {
        return <Empty { ...emptyObj } />;
    }

    return posts.map((val, idx) => (
        <Item key={ idx } { ...val } />
    )); 
};

export default Boosted;