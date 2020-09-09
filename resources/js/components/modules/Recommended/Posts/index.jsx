import React from 'react';
import classNames from 'classnames';
import DisableScroll from 'ui/DisableScroll';
import Empty from 'ui/Empty';
import { onTouchStart, onTouchEnd, onTouchMove, dropDefault } from 'helpers/updater';
import { ReactComponent as UpdateIcon } from 'assets/svg/updater.svg';
import Item from '../Item';
import Tabs from '../Tabs';
import emptyObj from './empty.json';

class Posts extends React.Component {
    constructor(props) {
        super(props);
        const { hashtags } = props;
        const firstHashtag = hashtags[0];
        const state = {
            page: 0
        };
        if (firstHashtag) {
            state.currentHashtag = firstHashtag.name;
        }
        this.state = state;
    }

    componentDidMount() {
        const { scroll, refresher, body } = this;
        const { getPosts, posts } = this.props;
        const { currentHashtag } = this.state;
        if (!posts || !posts.length) {
            getPosts(currentHashtag);
        }
        const banisher = scroll.state.targetRef.current;
        if (!banisher) {
            return;
        }
        banisher.addEventListener('touchstart', onTouchStart(body, refresher));
        banisher.addEventListener('touchmove', onTouchMove(body, refresher, banisher));
        banisher.addEventListener('touchend', onTouchEnd(body, refresher));
        banisher.addEventListener('scroll', this.onScroll(banisher));
        refresher.addEventListener('refreshData', this.refresh);
    }

    componentDidUpdate(prevProps, { page: prevPage, currentHashtag: prevHashtag }) {
        const { page, currentHashtag } = this.state;
        if (page === prevPage && currentHashtag === prevHashtag) {
            return;
        }

        const { getPosts, posts: { cursor }, hashtags } = this.props;
        if (hashtags) {
            getPosts(currentHashtag, page !== prevPage && cursor);
        }
    }

    componentWillUnmount() {
        const { scroll, refresher, body } = this;
        if (!scroll) {
            return;
        }
        const banisher = scroll.state.targetRef.current;
        banisher.removeEventListener('touchstart', onTouchStart(body, refresher));
        banisher.removeEventListener('touchmove', onTouchMove(body, refresher, banisher));
        banisher.removeEventListener('touchend', onTouchEnd(body, refresher));
        banisher.removeEventListener('scroll', this.onScroll(banisher));
        refresher.removeEventListener('refreshData', this.refresh);
    }

    onScroll = banisher => e => {
        const { loading } = this.props;
        const { page } = this.state;
        if (loading) {
            return;
        }
        const { scrollHeight, scrollTop } = banisher;
        const scroll = scrollTop + window.innerHeight - 114;
        const difference = scrollHeight - scroll;
        if (difference < window.innerHeight * 3) {
            this.setState({
                page: page + 1
            });
        }
    }

    refresh = () => {
        const { refreshPosts } = this.props;
        const { currentHashtag } = this.state;
        const { refresher, body } = this;
        refreshPosts(currentHashtag, dropDefault(body, refresher));
    }

    changeHashtag = hashtag => {
        this.setState({
            currentHashtag: hashtag
        });
    }

    render() {
        const { currentHashtag } = this.state;
        const { moved, hashtags } = this.props;
        const style = classNames({
            'recommended__content': true,
            'recommended__content--out': moved
        }); 

        return (
            <div className={ style }>
                <div className="updater updater--rec" ref={ ref => this.refresher = ref }>
                    <UpdateIcon />
                </div>
                <div ref={ ref => this.body = ref } rel="body">
                    { 
                        hashtags && <Tabs 
                            hashtags={ hashtags } 
                            onChange={ this.changeHashtag }
                            currentHashtag={ currentHashtag }
                        />
                    }
                    <DisableScroll classes="recommended__scroll" ref={ ref => this.scroll = ref }>
                        <PostList { ...this.props } />
                    </DisableScroll>
                </div>
            </div>
        );
    }
}

const PostList = props => {
    const { posts: { data = [] }, loading, hashtags } = props;
    const listStyle = classNames({
        'recommended-list': true,
        'recommended-list--hidden': loading && !data.length
    });

    if (!data.length && !loading && hashtags) {
        return <Empty { ...emptyObj } />;
    }   

    const postList = data.reduce((all = [], current) => {
        if (current['media_type'].toLowerCase() === 'image') {
            return all.concat({
                image: current['media_url'],
                id: current['id'],
                username: current['username'],
                caption: current['caption']
            });
        }
        return all;
    }, []);

    return (
        <div className="container--limited">
            <div className={ listStyle }>
            {
                postList.map((val, idx) => (
                    <Item 
                        key={ idx } 
                        { ...val }
                    />
                ))
            }
            </div>
        </div>
    );
};

export default Posts;